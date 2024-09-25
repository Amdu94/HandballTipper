import express from "express";
import { PrismaClient } from "@prisma/client"
import matchRoutes from "./routes/matchRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'; // JWT importálása
dotenv.config();

async function startServer() {
    const app = express();
    const prisma = new PrismaClient();

    const MONGO_URL = process.env.MONGO_URL;
    const PORT = process.env.PORT;

    if (!MONGO_URL) {
        console.error("Missing MONGO_URL environment variable");
        process.exit(1);
    }


    app.use(express.json());
	
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    };
	
    app.use("/api/matches", matchRoutes);
    app.use("/api/users", userRoutes);
    app.use(errorHandler);

    try {
        await prisma.$connect(MONGO_URL);

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});



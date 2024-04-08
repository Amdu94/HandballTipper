const express = require("express");
const { PrismaClient } = require('@prisma/client');
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config();

async function startServer() {
    const app = express();
    const prisma = new PrismaClient();

    const MONGO_URL = process.env.DATABASE_URL;
    const PORT = process.env.PORT;

    if (!MONGO_URL) {
        console.error("Missing MONGO_URL environment variable");
        process.exit(1);
    }

    app.use(express.json());
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



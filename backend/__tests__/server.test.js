import request from "supertest";
import express from "express";
import { PrismaClient } from '@prisma/client';
import matchRoutes from "../routes/matchRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import errorHandler from "../middleware/errorHandler.js";
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const app = express();
app.use(express.json());
app.use("/api/matches", matchRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

describe('Server Endpoints', () => {
    let prisma;

    beforeAll(() => {
        prisma = new PrismaClient();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('App starts and listens on the defined port', async () => {
        const PORT = process.env.PORT || 8080;
        const server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
        expect(server).toBeDefined();
        server.close();
    });

    describe('Error Handling', () => {
        it('Non-existent endpoint should return 404', async () => {
            const response = await request(app).get('/non-existent-endpoint');
            expect(response.statusCode).toBe(404);
        });
    });


});

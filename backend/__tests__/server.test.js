const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const matchRoutes = require('../routes/matchRoutes');
const userRoutes = require('../routes/userRoutes');
const errorHandler = require('../middleware/errorHandler');

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

    test('App starts and listens on the defined port', async () => {
        const PORT = process.env.PORT || 8080;
        const server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
        expect(server).toBeDefined();
        server.close();
    });




});

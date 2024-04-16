import request from "supertest";
import express from "express";
import { PrismaClient } from '@prisma/client';
import matchRoutes from "../routes/matchRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import fetchData from "../db/api/matchApi.js"
import errorHandler from "../middleware/errorHandler.js";
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/matches", matchRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const API_KEY = process.env.API_KEY;
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

    // Környezeti változók tesztelése
    it('should have the necessary environment variables', () => {
        expect(process.env.MONGO_URL).toBeDefined();
        expect(process.env.PORT).toBeDefined();
    });

    // Adatbázis kapcsolat tesztelé
    it('should connect to the database', async () => {
        await expect(prisma.$connect()).resolves.not.toThrow();
    });


    // Integrációs tesztek
    it('should integrate with external API successfully', async () => {
        // Mockoljuk a fetch függvényt
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ games: [] }), // Tegyük fel, hogy ez az API válasza
            })
        );

        const data = await fetchData(); // fetchData a mockolt fetch függvényt használja

        // Ellenőrizzük, hogy a fetch függvényt helyesen hívták-e meg
        expect(fetch).toHaveBeenCalledWith('https://api-handball.p.rapidapi.com/games?league=50&season=2023', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-handball.p.rapidapi.com'
            }
        });

        // Ellenőrizzük, hogy a válasz megfelelő-e
        expect(data).toEqual({ games: [] });
    });


});

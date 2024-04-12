import request from 'supertest';
import express from 'express';
import matchRoutes from '../routes/matchRoutes';
import { describe, it, expect, vi } from 'vitest';

const app = express();
app.use(express.json());
app.use('/api/matches', matchRoutes);

vi.mock('@prisma/client', () => {
    const mockMatches = [
        {
            id: '6614152331941ceff63eb070',
            date: new Date('2024-04-11T12:00:00Z'),
            home: 'HazaiCsapat',
            away: 'VendégCsapat',
            homeScore: null,
            awayScore: null,
            guesses: [
                {
                    user: '5e9f8f8f8f8f8f8f8f8f8f8f',
                    homeScore: 2,
                    awayScore: 1,
                    points: 3
                }
                // További tipp adatok...
            ]
        }
        // További meccs adatok...
    ];

    const mockPrismaClient = {
        matches: {
            findMany: vi.fn().mockResolvedValue(mockMatches),
            findUnique: vi.fn().mockImplementation(({ where }) => {
                const match = mockMatches.find(match => match.id === where.id);
                return Promise.resolve(match);
            }),
            // További mockolt metódusok...
        },
    };
    return {
        PrismaClient: vi.fn(() => mockPrismaClient)
    };
});

describe('Match Routes', () => {
    it('GET /api/matches - should return all matches', async () => {
        const response = await request(app).get('/api/matches').timeout(10000);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more specific assertions based on your data structure
    });

    it('GET /api/matches/:id - should return match by id', async () => {
        const matchId = '6614152331941ceff63eb070';
        const response = await request(app).get(`/api/matches/${matchId}`);
        console.log(response.statusCode);
        expect(response.statusCode).toBe(200);

        // Add more specific assertions based on your data structure
        //expect(response.body.id).toBe(matchId);
    });

    it('GET /api/matches/next - should return next matches', async () => {
        const response = await request(app).get('/api/matches/next');
        expect(response.statusCode).toBe(200);
        // Add more specific assertions based on your data structure
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/matches/:id/guesses - should return guesses for a specific match', async () => {
        const matchId = '6614152331941ceff63eb070'; // assuming this match id exists in your database
        const response = await request(app).get(`/api/matches/${matchId}/guesses`);
        expect(response.statusCode).toBe(200);
        // Add more specific assertions based on your data structure
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0); // Check if guesses array is not empty
        expect(response.body[0].user).toBeDefined(); // Check if user field is defined in the first guess
        // Add more specific assertions as needed
    });
});

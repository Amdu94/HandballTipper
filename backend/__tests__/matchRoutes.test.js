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
            home: 'HomeTeam',
            away: 'AwayTeam',
            homeScore: null,
            awayScore: null,
            guesses: [
                {
                    user: '5e9f8f8f8f8f8f8f8f8f8f8f',
                    homeScore: 2,
                    awayScore: 1,
                    points: 3
                }
            ]
        }
    ];

    const mockPrismaClient = {
        matches: {
            findMany: vi.fn().mockResolvedValue(mockMatches),
            findUnique: vi.fn().mockImplementation(({ where }) => {
                const match = mockMatches.find(match => match.id === where.id);
                return Promise.resolve(match);
            }),
        },
    };
    return {
        PrismaClient: vi.fn(() => mockPrismaClient)
    };
});

describe('Match Routes', () => {
    it('GET /api/matches - should return all matches', async () => {
        const response = await request(app).get('/api/matches');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/matches - should return matches with correct structure', async () => {
        const response = await request(app).get('/api/matches');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('home');
        expect(response.body[0]).toHaveProperty('away');
        expect(response.body[0].home).toBe('HazaiCsapat');
        expect(response.body[0].away).toBe('VendégCsapat');
    });

    it('GET /api/matches/:id - should return match by id', async () => {
        const matchId = '6614152331941ceff63eb070';
        const response = await request(app).get(`/api/matches/${matchId}`);
        expect(response.statusCode).toBe(200);

        //expect(response.body.id).toBe(matchId);
    });

    it('GET /api/matches/:id - should handle non-existent match id', async () => {
        const nonExistentMatchId = 'nonexistentid';
        const response = await request(app).get(`/api/matches/${nonExistentMatchId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    it('GET /api/matches/next - should return next matches', async () => {
        const response = await request(app).get('/api/matches/next');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/matches/:id/guesses - should return guesses for a specific match', async () => {
        const matchId = '6614152331941ceff63eb070';
        const response = await request(app).get(`/api/matches/${matchId}/guesses`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].user).toBeDefined();
    });

    it('GET /api/matches/:id - should return match by id with correct structure', async () => {
        const matchId = '6614152331941ceff63eb070';
        const response = await request(app).get(`/api/matches/${matchId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('home');
        expect(response.body).toHaveProperty('away');
        expect(response.body.id).toBe(matchId);
        expect(response.body.home).toBe('HazaiCsapat');
        expect(response.body.away).toBe('VendégCsapat');
    });

    it('GET /api/matches/next - should return next matches with correct structure', async () => {
        const response = await request(app).get('/api/matches/next');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('date');
        expect(response.body[0]).toHaveProperty('home');
    });

    it('GET /api/matches/:id/guesses - should return guesses for a specific match with correct structure', async () => {
        const matchId = '6614152331941ceff63eb070'; // assuming this match id exists in your database
        const response = await request(app).get(`/api/matches/${matchId}/guesses`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('user');
        expect(response.body[0]).toHaveProperty('homeScore');
    });

    it('GET /api/matches/:id - should handle non-existent match id', async () => {
        const nonExistentMatchId = 'nonexistentid';
        const response = await request(app).get(`/api/matches/${nonExistentMatchId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Match not found');
    });

});

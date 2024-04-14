import express from 'express';
import userRoutes from "../routes/userRoutes.js";
import request from 'supertest';
import { describe, it, expect, vi } from "vitest";

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// Mockoljuk a PrismaClient-et
vi.mock('@prisma/client', () => {
    const mockUsers = [
        // Itt adjuk meg a mockolt felhasználók listáját
        {
            id: '5e9f8f8f8f8f8f8f8f8f8f8f',
            username: 'teszt_felhasznalo1',
            email: 'teszt1@example.com',
            password: 'jelszo123',
            points: 100,
            guesses: [
                {
                    match: '6614152331941ceff63eb070',
                    homeScore: 2,
                    awayScore: 1,
                    points: 3
                },
                // További tipp adatok...
            ]
        },
        // További mockolt felhasználók...
    ];

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
                },
                // További tipp adatok...
            ]
        },
        // További meccs adatok...
    ];

    const mockPrismaClient = {
        users: {
            findMany: vi.fn().mockResolvedValue(mockUsers),
            findUnique: vi.fn().mockImplementation(({ where }) => {
                const user = mockUsers.find(user => user.id === where.id);
                return Promise.resolve(user);
            }),
            create: vi.fn().mockImplementation(({ data }) => {
                const newUser = {
                    id: 'új_felhasználó_id', // Egyedi ID generálása
                    ...data,
                    guesses: mockMatches.map(match => ({
                        match: match.id,
                        homeScore: null,
                        awayScore: null,
                        points: 0,
                    })),
                };
                mockUsers.push(newUser);
                return Promise.resolve(newUser);
            }),
            update: vi.fn().mockImplementation(({ where, data }) => {
                const userIndex = mockUsers.findIndex(user => user.id === where.id);
                if (userIndex !== -1) {
                    const guesses = [...mockUsers[userIndex].guesses];
                    const guessIndex = guesses.findIndex(guess => guess.match === data.guesses[0].match);
                    if (guessIndex !== -1) {
                        guesses[guessIndex] = { ...guesses[guessIndex], ...data.guesses[0] };
                    }
                    mockUsers[userIndex].guesses = guesses;
                    return Promise.resolve(mockUsers[userIndex]);
                }
                return Promise.reject(new Error('User not found'));
            }),
        },
        matches: {
            findMany: vi.fn().mockResolvedValue(mockMatches),
            findUnique: vi.fn().mockImplementation(({ where }) => {
                const match = mockMatches.find(match => match.id === where.id);
                return Promise.resolve(match);
            }),
            update: vi.fn().mockImplementation(({ where, data }) => {
                const matchIndex = mockMatches.findIndex(match => match.id === where.id);
                if (matchIndex !== -1) {
                    const guesses = [...mockMatches[matchIndex].guesses];
                    const guessIndex = guesses.findIndex(guess => guess.user === data.guesses[0].user);
                    if (guessIndex !== -1) {
                        guesses[guessIndex] = { ...guesses[guessIndex], ...data.guesses[0] };
                    }
                    mockMatches[matchIndex].guesses = guesses;
                    return Promise.resolve(mockMatches[matchIndex]);
                }
                return Promise.reject(new Error('Match not found'));
            }),
        },
    };
    return {
        PrismaClient: vi.fn(() => mockPrismaClient)
    };
});



describe('User Routes', () => {
    it('GET /api/users - should return all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/users/:id - should return a specific user by id', async () => {
        const userId = '5e9f8f8f8f8f8f8f8f8f8f8f';
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
    });

    it('POST /api/users - should create a new user', async () => {
        const newUser = {
            username: 'uj_felhasznalo',
            email: 'uj@example.com',
            password: 'jelszo123'
        };
        const response = await request(app)
            .post('/api/users')
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
        expect(response.body).toHaveProperty('password', newUser.password);
        expect(response.body.guesses).toBeInstanceOf(Array);
    });

    it('PATCH /api/users/:id/guesses/:guessId - should update a user guess', async () => {
        const userId = '5e9f8f8f8f8f8f8f8f8f8f8f';
        const guessId = '6614152331941ceff63eb070';
        const updatedGuessData = {
            homeScore: 3,
            awayScore: 1
        };

        const response = await request(app)
            .patch(`/api/users/${userId}/guesses/${guessId}`)
            .send(updatedGuessData);
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Guess updated successfully");
        // ...további ellenőrzések...
    });

});

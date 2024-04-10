const request = require('supertest');
const express = require('express');
const matchRoutes = require('../routes/matchRoutes');

const app = express();
app.use(express.json());
app.use('/api/matches', matchRoutes);

describe('Match Routes', () => {
    test('GET /api/matches - should return all matches', async () => {
        const response = await request(app).get('/api/matches');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /api/matches/next - should return next matches', async () => {
        const response = await request(app).get('/api/matches/next');
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/matches/:id - should return match by id', async () => {
        const matchId = '6614152331941ceff63eb070';
        const response = await request(app).get(`/api/matches/${matchId}`);
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/matches/:id/guesses - should return guesses for a specific match', async () => {
        const matchId = '6614152331941ceff63eb070'; // assuming this match id exists in your database
        const response = await request(app).get(`/api/matches/${matchId}/guesses`);
        expect(response.statusCode).toBe(200);
    });

});

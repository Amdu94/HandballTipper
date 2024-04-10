const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
    test('GET /api/users - should return all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /api/users/:id - should return a specific user by id', async () => {
        const userId = '66141538f1452d367f499d54'; // assuming this user id exists in your database
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', userId);
    });

    test('POST /api/users - should create a new user', async () => {
        const newUser = {
            username: 'John Doe1',
            email: 'john1@example.com',
            password: 'john1'
        };
        const response = await request(app)
            .post('/api/users')
            .send(newUser);
        expect(response.statusCode).toBe(201); // Assuming status 201 for created resource
        expect(response.body).toHaveProperty('id');
    });

    test('PATCH /api/users/:userId/guesses/:guessId - should update a user guess', async () => {
        const userId = '66141538f1452d367f499d54'; // assuming this user id exists in your database
        const guessId = '6614152331941ceff63eb070'; // assuming this guess id exists for the user
        const updatedGuess = {
            homeScore: 40,
            awayScore: 40
        };
        const response = await request(app)
            .patch(`/api/users/${userId}/guesses/${guessId}`)
            .send(updatedGuess);
        expect(response.statusCode).toBe(200);
    });

    test('POST /api/users - should fail with missing fields', async () => {
        const newUser = {
            // Missing username, email, password fields
        };
        const response = await request(app)
            .post('/api/users')
            .send(newUser);
        expect(response.statusCode).toBe(500); // Assuming status 400 for bad request
    });

    test('GET /api/users/:id/guesses - should return guesses for a specific user', async () => {
        const userId = '66141538f1452d367f499d54'; // assuming this user id exists in your database
        const response = await request(app).get(`/api/users/${userId}/guesses`);
        expect(response.statusCode).toBe(200);
    });

});

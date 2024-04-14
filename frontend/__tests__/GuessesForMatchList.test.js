import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import GuessesForMatchList from '../src/Pages/GuessesForMatchList';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{ id: 'guess1', user: 'User1', homeScore: 2, awayScore: 1, points: 3 }]),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('GuessesForMatchList', () => {
    test('loads and displays guesses', async () => {
        render(
            <MemoryRouter initialEntries={['/matches/match1/guesses']}>
                <Routes>
                    <Route path="/matches/:matchId/guesses" element={<GuessesForMatchList />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('User1')).toBeInTheDocument();
        });
    });
});


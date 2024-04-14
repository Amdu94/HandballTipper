import React from "react";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import GuessesList from '../src/Pages/GuessesList';


global.fetch = jest.fn((url) =>
    url.includes('/guesses')
        ? Promise.resolve({
            json: () => Promise.resolve([{ match: 'match1', homeScore: 2, awayScore: 1, points: 3 }]),
        })
        : Promise.resolve({
            json: () => Promise.resolve([{ id: 'match1', date: '2024-04-11T12:00:00Z' }]),
        })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('GuessesList', () => {
    test('loads and displays guesses', async () => {
        render(
            <MemoryRouter initialEntries={['/users/user1/guesses']}>
                <Routes>
                    <Route path="/users/:userId/guesses" element={<GuessesList />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByDisplayValue('2')).toBeInTheDocument();
        });
    });

});

import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MatchesList from '../src/Pages/MatchesList.jsx';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { id: '1',
                home: 'HomeTeam',
                away: 'AwayTeam',
                date: '2024-04-11T12:00:00Z',
                homeScore: 2,
                awayScore: 1
            },
            // Additional mock match data...
        ]),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('MatchesList', () => {
    test('loads and displays matches', async () => {
        render(
            <Router>
                <MatchesList />
            </Router>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('HomeTeam')).toBeInTheDocument();
            expect(screen.getByText('AwayTeam')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
        });
    });
    test('displays no matches message when the list is empty', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );

        render(
            <Router>
                <MatchesList />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('No matches available')).toBeInTheDocument();
        });
    });

});


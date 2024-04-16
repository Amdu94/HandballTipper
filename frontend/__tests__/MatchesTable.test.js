import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import MatchesTable from '../src/Components/MatchesTable';

describe('MatchesTable Component', () => {
    test('renders match data correctly', () => {
        const mockMatches = [
            {
                id: '1',
                home: 'HomeTeam',
                away: 'AwayTeam',
                date: '2024-04-11T12:00:00Z',
                homeScore: 2,
                awayScore: 1
            }
            // Additional mock data...
        ];

        render(
            <Router>
                <MatchesTable matches={mockMatches} />
            </Router>
        );

        expect(screen.getByText('HomeTeam')).toBeInTheDocument();
        expect(screen.getByText('AwayTeam')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2024. ápr. 11. 12:00')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /View Guesses/i })).toBeInTheDocument();
    });
});



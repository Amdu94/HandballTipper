import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuessesForMatchTable from '../src/Components/GuessesForMatchTable';

describe('GuessesForMatchTable', () => {
    const mockGuesses = [
        { id: 'guess1', user: 'User1', homeScore: 2, awayScore: 1, points: 3 },
        { id: 'guess2', user: 'User2', homeScore: 0, awayScore: 0, points: 1 },
        // Additional mock guess data...
    ];

    test('renders GuessesForMatchTable with no guesses', () => {
        render(<GuessesForMatchTable guesses={[]} />);
        expect(screen.getByText(/user/i)).toBeInTheDocument();
        expect(screen.getByText(/home score/i)).toBeInTheDocument();
        expect(screen.getByText(/away score/i)).toBeInTheDocument();
        expect(screen.getByText(/points/i)).toBeInTheDocument();
        expect(screen.queryByText(/User1/i)).toBeNull();
    });

    test('renders GuessesForMatchTable with guesses', () => {
        render(<GuessesForMatchTable guesses={mockGuesses} />);
        expect(screen.getByText(/User1/i)).toBeInTheDocument();

        const homeScoreCells = screen.getAllByRole('cell', { name: /2/i });
        const homeScoreForUser1 = homeScoreCells.find(cell => cell.textContent === '2');
        expect(homeScoreForUser1).toBeInTheDocument();

        const awayScoreCells = screen.getAllByRole('cell', { name: /1/i });
        const awayScoreForUser1 = awayScoreCells.find(cell => cell.textContent === '1');
        expect(awayScoreForUser1).toBeInTheDocument();

        const pointsCells = screen.getAllByRole('cell', { name: /3/i });
        const pointsForUser1 = pointsCells.find(cell => cell.textContent === '3');
        expect(pointsForUser1).toBeInTheDocument();

        expect(screen.getByText(/User2/i)).toBeInTheDocument();
    });
});


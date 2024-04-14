import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GuessesTable from '../src/Components/GuessesTable';

describe('GuessesTable', () => {
    const mockGuesses = [
        {
            match: 'match1',
            homeScore: 2,
            awayScore: 1,
            points: 3,
            matchDetails: { home: 'HomeTeam', away: 'AwayTeam' },
            pastMatch: false
        },
        {
            match: 'match2',
            homeScore: 0,
            awayScore: 0,
            points: 1,
            matchDetails: { home: 'HomeTeam2', away: 'AwayTeam2' },
            pastMatch: true
        },
        // Additional mock guess data...
    ];

    test('renders GuessesTable component', () => {
        render(<GuessesTable guesses={mockGuesses} onGuessChange={() => {}} onSaveGuess={() => {}} />);
        expect(screen.getByText(/match/i)).toBeInTheDocument();
        expect(screen.getByText(/home score/i)).toBeInTheDocument();
        expect(screen.getByText(/away score/i)).toBeInTheDocument();
        expect(screen.getByText(/points/i)).toBeInTheDocument();
        expect(screen.getByText(/action/i)).toBeInTheDocument();
    });

    test('calls onGuessChange when input values change', () => {
        const mockOnGuessChange = jest.fn();
        render(<GuessesTable guesses={mockGuesses} onGuessChange={mockOnGuessChange} onSaveGuess={() => {}} />);
        fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '3' } });
        expect(mockOnGuessChange).toHaveBeenCalledWith(0, 'homeScore', '3');
    });

    test('disables input if match is past', () => {
        render(<GuessesTable guesses={mockGuesses} onGuessChange={() => {}} onSaveGuess={() => {}} />);
        const allInputs = screen.getAllByRole('spinbutton');
        const disabledInputs = allInputs.filter(input => input.disabled);
        expect(disabledInputs[0]).toBeDisabled();
    });

    test('calls onSaveGuess when Save button is clicked', () => {
        const mockOnSaveGuess = jest.fn();
        render(<GuessesTable guesses={mockGuesses} onGuessChange={() => {}} onSaveGuess={mockOnSaveGuess} />);
        const saveButtons = screen.getAllByText('Save');
        fireEvent.click(saveButtons[0]);
        expect(mockOnSaveGuess).toHaveBeenCalledWith(mockGuesses[0].match);
    });

    test('displays "The guess is not allowed" message for past matches', () => {
        render(<GuessesTable guesses={mockGuesses} onGuessChange={() => {}} onSaveGuess={() => {}} />);
        const notAllowedMessages = screen.getAllByText('The guess is not allowed');
        expect(notAllowedMessages.length).toBeGreaterThan(0);
    });

});




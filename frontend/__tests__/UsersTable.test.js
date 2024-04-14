import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import UsersTable from '../src/Components/UsersTable';

describe('UsersTable', () => {
    const mockUsers = [
        {
            id: 'user1',
            username: 'User1',
            email: 'user1@example.com',
            points: 100,
        },
        // Additional mock user data...
    ];

    test('renders UsersTable component with user data', () => {
        render(
            <Router>
                <UsersTable users={mockUsers} />
            </Router>
        );
        expect(screen.getByText('User1')).toBeInTheDocument();
        expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    test('renders links to view guesses for each user', () => {
        render(
            <Router>
                <UsersTable users={mockUsers} />
            </Router>
        );
        expect(screen.getByRole('link', { name: /view guesses/i })).toHaveAttribute('href', '/users/user1/guesses');
    });

});


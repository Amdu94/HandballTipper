import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserList from '../src/Pages/UserList';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { id: 'user1', username: 'User1', email: 'user1@example.com', points: 100 },
            // Additional mock user data...
        ]),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('UserList', () => {
    test('loads and displays users', async () => {
        render(
            <Router>
                <UserList />
            </Router>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('User1')).toBeInTheDocument();
            expect(screen.getByText('user1@example.com')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });

    test('displays no users message when the list is empty', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]), // Empty list
            })
        );

        render(
            <Router>
                <UserList />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('No users found')).toBeInTheDocument();
        });
    });

    test('updates with new data when users are added', async () => {
        const newUsers = [
            { id: 'user2', username: 'User2', email: 'user2@example.com', points: 150 },
            // Additional users...
        ];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(newUsers),
            })
        );

        render(
            <Router>
                <UserList />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('User2')).toBeInTheDocument();
            expect(screen.getByText('user2@example.com')).toBeInTheDocument();
            expect(screen.getByText('150')).toBeInTheDocument();
        });
    });

});



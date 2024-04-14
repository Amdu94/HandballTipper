import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCreator from "../src/Pages/UserCreator.jsx";

// Mock the navigate function
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('UserCreator', () => {
    test('should create a user and navigate to the guesses page', async () => {
        render(<UserCreator />);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: '123' }),
            })
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /create user/i }));


        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/users/123/guesses'));

        global.fetch.mockClear();
    });

});




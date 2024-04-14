import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateUserForm from '../src/Components/CreateUserForm/CreateUserForm.jsx';

describe('CreateUserForm', () => {
    test('renders CreateUserForm component', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('allows user to enter username, email, and password', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        expect(screen.getByLabelText(/username/i).value).toBe('test_user');
        expect(screen.getByLabelText(/email/i).value).toBe('test@example.com');
        expect(screen.getByLabelText(/password/i).value).toBe('password123');
    });

    test('calls onSave with the user data when form is submitted', () => {
        const mockOnSave = jest.fn();
        render(<CreateUserForm onSave={mockOnSave} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/create user/i));
        expect(mockOnSave).toHaveBeenCalledWith({
            username: 'test_user',
            email: 'test@example.com',
            password: 'password123',
        });
    });

    test('does not call onSave if the username is empty when form is submitted', () => {
        const mockOnSave = jest.fn();
        render(<CreateUserForm onSave={mockOnSave} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/create user/i));
        expect(mockOnSave).not.toHaveBeenCalled();
    });

    test('displays error message if the email is invalid', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid_email' } });
        fireEvent.blur(screen.getByLabelText(/email/i));
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });

    test('password field should be type password to hide password input', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    });

    test('calls onCancel when the cancel button is clicked', () => {
        const mockOnCancel = jest.fn();
        render(<CreateUserForm onSave={() => {}} onCancel={mockOnCancel} />);
        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockOnCancel).toHaveBeenCalled();
    });

    test('the create user button is disabled when the form is initially rendered', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        expect(screen.getByText(/create user/i)).toBeDisabled();
    });

    // Additional tests such as testing the functionality of the "Cancel" button, or handling the "disabled" prop...
});

describe('CreateUserForm Logic Tests', () => {
    test('form is invalid if username is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is invalid if email is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is invalid if password is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is valid and button is enabled when all fields are filled', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).not.toBeDisabled();
    });
});



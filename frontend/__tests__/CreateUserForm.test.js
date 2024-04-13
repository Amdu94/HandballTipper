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
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'teszt_felhasznalo' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        expect(screen.getByLabelText(/username/i).value).toBe('teszt_felhasznalo');
        expect(screen.getByLabelText(/email/i).value).toBe('teszt@example.com');
        expect(screen.getByLabelText(/password/i).value).toBe('jelszo123');
    });

    test('calls onSave with the user data when form is submitted', () => {
        const mockOnSave = jest.fn();
        render(<CreateUserForm onSave={mockOnSave} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'teszt_felhasznalo' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        fireEvent.click(screen.getByText(/create user/i));
        expect(mockOnSave).toHaveBeenCalledWith({
            username: 'teszt_felhasznalo',
            email: 'teszt@example.com',
            password: 'jelszo123',
        });
    });

    test('does not call onSave if the username is empty when form is submitted', () => {
        const mockOnSave = jest.fn();
        render(<CreateUserForm onSave={mockOnSave} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        fireEvent.click(screen.getByText(/create user/i));
        expect(mockOnSave).not.toHaveBeenCalled();
    });

    test('displays error message if the email is invalid', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'tesztemail' } });
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


    // További tesztek, mint például a "Cancel" gomb funkciója, vagy a "disabled" prop kezelése...
});

describe('CreateUserForm Logic Tests', () => {
    test('form is invalid if username is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is invalid if email is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'teszt_felhasznalo' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is invalid if password is empty', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'teszt_felhasznalo' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).toBeDisabled();
    });

    test('form is valid and button is enabled when all fields are filled', () => {
        render(<CreateUserForm onSave={() => {}} onCancel={() => {}} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'teszt_felhasznalo' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teszt@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'jelszo123' } });
        const createUserButton = screen.getByRole('button', { name: /create user/i });
        expect(createUserButton).not.toBeDisabled();
    });

    // További tesztek, mint például az email formátumának ellenőrzése, vagy a jelszó hosszának és biztonságának tesztelése...
});


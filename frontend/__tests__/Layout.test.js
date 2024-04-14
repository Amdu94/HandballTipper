import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from '../src/Pages/Layout';

describe('Layout', () => {
    test('renders Layout with navigation links', () => {
        render(
            <Router>
                <Layout />
            </Router>
        );
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/matches/i)).toBeInTheDocument();
        expect(screen.getByText(/users/i)).toBeInTheDocument();
        expect(screen.getByText(/create user/i)).toBeInTheDocument();
    });

    test('navigation links have correct href attributes', () => {
        render(
            <Router>
                <Layout />
            </Router>
        );
        expect(screen.getByText(/home/i).closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText(/matches/i).closest('a')).toHaveAttribute('href', '/matches');
        expect(screen.getByText(/users/i).closest('a')).toHaveAttribute('href', '/users');
        expect(screen.getByText(/create user/i).closest('a')).toHaveAttribute('href', '/newUser');
    });
});

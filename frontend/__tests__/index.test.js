import React from "react";
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import Layout from '../src/Pages/Layout/Layout.jsx';
import Home from '../src/Pages/Home.jsx';
describe('Routing', () => {
    test('renders the home page on the root route', async () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <Layout />,
                children: [
                    { path: '/', element: <Home /> },

                ],
            },
        ]);

        render(
            <RouterProvider router={router} />
        );

        const welcomeText = await screen.findByText(/Welcome to your handball prediction app!/i);
        expect(welcomeText).toBeInTheDocument();

        const descriptionText = await screen.findByText(/This app allows you to create a user account, view upcoming matches, and submit your predictions for their scores. You can also track your past predictions and see how well you're doing./i);
        expect(descriptionText).toBeInTheDocument();
    });

});

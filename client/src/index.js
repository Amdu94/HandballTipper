import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import MatchesList from "./Pages/MatchesList";
import UserList from "./Pages/UserList";
import GuessesList from "./Pages/GuessesList";
import UserForm from "./Pages/UserCreator";
import Home from "./Pages/Home";

import './index.css';
import GuessesForMatchList from "./Pages/GuessesForMatchList";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/matches",
                element: <MatchesList/>,
            },
            {
                path: "/matches/:matchId/guesses",
                element: <GuessesForMatchList/>
            },
            {
                path: "/users",
                element: <UserList/>
            },
            {
                path: "/users/:userId/guesses", // Új útvonal
                element: <GuessesList />,
            },
            {
                path: "/newUser",
                element: <UserForm />
            }
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

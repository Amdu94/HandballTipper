import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals.js';

import Layout from "./Pages/Layout/Layout.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import MatchesList from "./Pages/MatchesList.jsx";
import UserList from "./Pages/UserList.jsx";
import GuessesList from "./Pages/GuessesList.jsx";
import UserForm from "./Pages/UserCreator.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Logout from "./Pages/Logout.jsx";
import ProtectedRoute from './Pages/ProtectedRoute.jsx';

import './index.css';
import GuessesForMatchList from "./Pages/GuessesForMatchList.jsx";



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
                path: "/login", // Új útvonal a bejelentkezéshez
                element: <Login />,
            },
			{
                path: "/logout", // Új útvonal a bejelentkezéshez
                element: <Logout />,
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
				element: (
					<ProtectedRoute>
						<UserList />
					</ProtectedRoute>
				),
			},
			{
				path: "/users/:userId/guesses",
				element: (
					<ProtectedRoute>
						<GuessesList />
					</ProtectedRoute>
				),
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

// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginUser = (credentials) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to login');
        }
        return res.json();
    });
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        loginUser({ username, password })
            .then((data) => {
                localStorage.setItem('token', data.token); // JWT token elmentése
                localStorage.setItem('username', username); // Felhasználónév elmentése
                navigate('/'); // Átirányítás a főoldalra
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setError('Invalid credentials');
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

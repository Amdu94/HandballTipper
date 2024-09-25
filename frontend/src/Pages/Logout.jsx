import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate(); // 'navigate' definálása

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // JWT token törlése
        navigate('/login'); // Átirányítás a bejelentkezési oldalra
    };

    return (
        <div>
            <h2>You have been logged out</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;


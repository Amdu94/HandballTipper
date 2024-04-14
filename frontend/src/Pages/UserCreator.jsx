import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUserForm from '../Components/CreateUserForm/CreateUserForm.jsx';

const createUser = (user) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to create user');
        }
        return res.json();
    });
};

const UserCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Új állapot a hibaüzenet tárolására

    const handleCreateUser = (user) => {
        setLoading(true);
        setError(''); // Töröljük a korábbi hibaüzenetet

        createUser(user)
            .then((createdUser) => {
                setLoading(false);
                console.log('User created successfully');
                navigate(`/users/${createdUser.id}/guesses`);
            })
            .catch((error) => {
                console.error('Failed to create user', error);
                setError(error.message); // Beállítjuk a hibaüzenetet
                setLoading(false);
            });
    };

    return (
        <CreateUserForm
            onCancel={() => navigate('/')}
            disabled={loading}
            onSave={handleCreateUser}
            errorMessage={error} // Átadjuk a hibaüzenetet a formnak
        />
    );
};

export default UserCreator;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUserForm from '../Components/CreateUserForm';

const createUser = (user) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((res) => res.json());
};

const CreateUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateUser = (user) => {
        setLoading(true);

        createUser(user)
            .then((createdUser) => {
                setLoading(false);
                // További műveletek, pl. átirányítás
                console.log('User created successfully');
                navigate(`/users/${createdUser._id}/guesses`);
            })
            .catch((error) => {
                console.error('Failed to create user', error);
                setLoading(false);
            });
    };

    return (
        <CreateUserForm
            onCancel={() => navigate('/')}
            disabled={loading}
            onSave={handleCreateUser}
        />
    );
};

export default CreateUser;


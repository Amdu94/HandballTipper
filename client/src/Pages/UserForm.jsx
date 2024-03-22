import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../Components/UserForm';

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
            .then(() => {
                setLoading(false);
                // További műveletek, pl. átirányítás
                console.log('User created successfully');
            })
            .catch((error) => {
                console.error('Failed to create user', error);
                setLoading(false);
            });
    };

    return (
        <UserForm
            onCancel={() => navigate('/')}
            disabled={loading}
            onSave={handleCreateUser}
        />
    );
};

export default CreateUser;

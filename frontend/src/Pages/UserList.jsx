import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading/Loading.jsx';
import UsersTable from '../Components/UsersTable/UsersTable.jsx';

const fetchUsers = () => {
    const token = localStorage.getItem('token'); // JWT token kinyerése
    return fetch('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`, // Token hozzáadása a fejléchez
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error('Unauthorized');
        }
        return res.json();
    });
};

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((users) => {
                setLoading(false);
                setUsers(users);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!users || users.length === 0) {
        return <div>No users found</div>;
    }

    if (error) {
        return <div>Error fetching users: {error.message}</div>;
    }

    return <UsersTable users={users} />;
};

export default UserList;



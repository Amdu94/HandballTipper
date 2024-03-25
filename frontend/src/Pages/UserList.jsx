// UserList.js

import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import UsersTable from '../Components/UsersTable';

const fetchUsers = () => {
    return fetch('/api/users').then((res) => res.json());
};

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((users) => {
                setLoading(false);
                setUsers(users);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <UsersTable users={users} />; // A users prop átadása a UsersTable komponensnek
};

export default UserList;



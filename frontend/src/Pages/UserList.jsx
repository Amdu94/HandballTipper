import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading/Loading.jsx';
import UsersTable from '../Components/UsersTable/UsersTable.jsx';

const fetchUsers = () => {
    return fetch('/api/users').then((res) => res.json());
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



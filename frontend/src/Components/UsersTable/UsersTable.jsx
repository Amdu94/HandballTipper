import React from 'react';
import { Link } from 'react-router-dom';

import "./UsersTable.css"

const UsersTable = ({ users }) => (
    <div className="UsersTable">
        <table>
            <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Points</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.points}</td>
                    <td>
                        <Link to={`/users/${user._id}/guesses`}>
                            View Guesses
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default UsersTable;

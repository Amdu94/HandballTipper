import React, { useState } from 'react';

const UserForm = ({ onSave, disabled, user, onCancel }) => {
    const [username, setUsername] = useState(user?.username ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState(user?.password ?? '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            return onSave({
                ...user,
                username,
                email,
                password,
            });
        }

        return onSave({
            username,
            email,
            password,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={disabled}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={disabled}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={disabled}
                />
            </label>
            <button type="submit" disabled={disabled}>
                {user ? 'Update User' : 'Create User'}
            </button>
            <button type="button" onClick={onCancel} disabled={disabled}>
                Cancel
            </button>
        </form>
    );
};

export default UserForm;

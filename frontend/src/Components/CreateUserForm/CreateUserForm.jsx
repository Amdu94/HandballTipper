import React, { useState } from 'react';

import "./CreateUserForm.css";

const CreateUserForm = ({ onSave, disabled, user, onCancel }) => {
    const [username, setUsername] = useState(user?.username ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState(user?.password ?? '');
    const [emailError, setEmailError] = useState('');

    const isFormValid = () => {
        if (!username || !email || !password) return false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        const userData = { username, email, password };
        onSave(user ? { ...user, ...userData } : userData);
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
                    onBlur={() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? setEmailError('') : setEmailError('Invalid email address')}
                />
                {emailError && <div className="error">{emailError}</div>}
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
            <button type="submit" disabled={disabled || !isFormValid()}>
                {user ? 'Update User' : 'Create User'}
            </button>
            <button type="button" onClick={onCancel} disabled={disabled}>
                Cancel
            </button>
        </form>
    );
};

export default CreateUserForm;

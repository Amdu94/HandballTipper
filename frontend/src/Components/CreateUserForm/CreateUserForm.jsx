import React, { useState } from 'react';

import "./CreateUserForm.css";

const CreateUserForm = ({ onSave, disabled, user, onCancel, errorMessage }) => {
    const [username, setUsername] = useState(user?.username ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState(user?.password ?? '');
    const [emailError, setEmailError] = useState('');
    const [formError, setFormError] = useState(errorMessage);

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (!username || !email || !password) {
            setFormError('All fields are required');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email address');
            valid = false;
        }

        if (valid) {
            setFormError('');
            setEmailError('');
            const userData = { username, email, password };
            onSave(user ? { ...user, ...userData } : userData);
        }
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
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit" disabled={disabled || !username || !email || !password || emailError || formError}>
                {user ? 'Update User' : 'Create User'}
            </button>
            <button type="button" onClick={onCancel} disabled={disabled}>
                Cancel
            </button>
        </form>
    );
};

export default CreateUserForm;

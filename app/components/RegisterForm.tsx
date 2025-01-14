'use client';

import {useRouter} from 'next/navigation';
import React, {useRef, useState} from 'react';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const passwordRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const password = passwordRef.current?.value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error signing up');
            }

            setMessage('User created successfully');
            router.push('/api/auth/signin');
        } catch (error) {
            setMessage('Error signing up');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-label="Username"
                    className="text-black"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    ref={passwordRef}
                    required
                    aria-label="Password"
                    className="text-black"
                />
            </div>
            <button type="submit">Sign Up</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;
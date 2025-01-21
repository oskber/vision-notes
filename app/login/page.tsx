'use client';

import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl mb-6">Login</h1>
            <LoginForm/>
        </main>
    );
}
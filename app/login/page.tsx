'use client';

import LoginForm from '@/app/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl mb-6">Login</h1>
            <LoginForm/>
            <p className="my-3">
                Don&#39;t have an account?
                <Link href="/register" className="mx-2 underline">
                    Register
                </Link>
            </p>
        </main>
    );
}
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string; // Add custom property `id`
        } & DefaultSession['user']; // Include default `user` properties (e.g., name, email)
    }

    interface User extends DefaultUser {
        id: string;
        password?: string; // Include optional password for server-side use only
    }
}
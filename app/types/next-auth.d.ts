import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        _id?: string;
        password?: string;
        githubId?: string;
    }
}
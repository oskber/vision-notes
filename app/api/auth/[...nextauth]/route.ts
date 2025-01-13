import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import {MongoClient} from 'mongodb';
import bcrypt from 'bcryptjs';

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
}
const client = new MongoClient(process.env.MONGODB_URI);


interface User {
    id: string;
    name: string;
}

async function authorize(credentials: Record<'username' | 'password', string> | undefined): Promise<User | null> {
    if (!credentials) {
        return null;
    }
    
    try {
        await client.connect();
        const db = client.db();
        const usersCollection = db.collection('users');
        
        const user = await usersCollection.findOne({ username: credentials.username, password: credentials.password });
        if (!user) {
            return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
            return null;
        }

            return {id: user._id.toString(), name: user.username};
    } catch (error) {
        throw new Error('Authentication failed');
    } finally {
        await client.close();
    }
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GITHUB_ID and GITHUB_SECRET must be defined");
}

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize,
        }),
    ],
}

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
import NextAuth, {NextAuthOptions, Profile as NextAuthProfile, Session} from 'next-auth';
import {JWT} from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mongoose, {Types} from 'mongoose';
import User from '@/app/models/userModel';
import connectDB from '@/app/lib/connectDB';

const mongoUri = process.env.MONGODB_URI;

async function connectDb() {
    if (!mongoUri) {
        throw new Error('MONGODB_URI must be defined');
    }
    await mongoose.connect(mongoUri);
}
interface User {
    id: string;
    name: string;
}

interface ExtendedProfile extends NextAuthProfile {
    id: string;
    login: string;
}

async function authorize(credentials: Record<'username' | 'password', string> | undefined): Promise<User | null> {
    if (!credentials) {
        return null;
    }

    try {
        await connectDb();
        const usersCollection = mongoose.connection.collection('users');
        const user = await usersCollection.findOne({username: credentials.username});
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
    }
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GITHUB_ID and GITHUB_SECRET must be defined");
}

export const authOptions: NextAuthOptions = {
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
    callbacks: {
        async session({session, token}: { session: Session, token: JWT }) {
            if (token?.sub) {
                session.user.id = token.sub;
                session.user.name = token.name;
            }
            return session;
        },
        async jwt({token, account, profile}) {
            if (account?.provider === 'github' && profile) {
                const extendedProfile = profile as ExtendedProfile;
                await connectDB();
                let dbUser = await User.findOne({githubId: extendedProfile.id});
                if (!dbUser) {
                    dbUser = new User({
                        username: extendedProfile.login,
                        githubId: extendedProfile.id,
                        mongoId: new Types.ObjectId(),
                    });
                    await dbUser.save();
                }
                token.id = dbUser.githubId;
            }
            return token;
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
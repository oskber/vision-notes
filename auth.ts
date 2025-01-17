import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/app/models/userModel';

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    providers: [
        Github(
            {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }), CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const user = await User.findOne({
                        email: credentials?.email
                    })
                    console.log(user);
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );

                        if (isMatch) {

                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.name,
                            };
                        } else {
                            throw new Error('Email or Password is not correct');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (error) {
                    throw new Error(error as string);
                }
            },
        }),
    ],
    callbacks: {
        async session({session, token}) {
            if (token?.sub) {
                session.user.id = token.sub;
            }

            return session;
        },
    },
});


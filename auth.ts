import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import User from '@/app/models/userModel';
import connectDB from './app/lib/connectDB';

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    providers: [
        Github(
            {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
        Google(
            {
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
            }
        )
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if (!account || !profile) return false;

            await connectDB();

            if (account.provider === 'github') {
                const githubId = profile.id;
                const email = profile.email;

                try {
                    let existingUser = await User.findOne({githubId});

                    if (!existingUser) {
                        existingUser = await User.create({
                            githubId,
                            email,
                            name: profile.name,
                            image: profile.avatar_url,
                        });
                    }

                    user.id = existingUser._id.toString();
                    console.log('signIn - User ID set to MongoDB _id:', user.id);

                    return true;
                } catch (error) {
                    console.error('Error in signIn callback:', error);
                    return false;
                }
            } else if (account.provider === 'google') {
                console.log('Google profile:', profile);
                const googleId = profile.sub;
                const email = profile.email;

                try {
                    let existingUser = await User.findOne({googleId});

                    if (!existingUser) {
                        existingUser = await User.create({
                            googleId,
                            email,
                            name: profile.name,
                            image: profile.picture,
                        });
                        console.log('signIn - New Google user created:', existingUser);
                    }

                    user.id = existingUser._id.toString();

                    return true;
                } catch (error) {
                    return false;
                }
            }
            return true;
        },
        async jwt({token, user}) {
            if (user) {
                console.log('jwt - user:', user);
                token.sub = user.id || user._id?.toString();
                console.log('jwt - token.sub set to MongoDB ID:', token.sub);
            } else {
                console.log('jwt - no user, token.sub:', token.sub);
            }
            return token;
        },

        async session({session, token}) {
            console.log('session - received token.sub:', token.sub);

            if (token?.sub) {
                session.user.id = token.sub;
                console.log('session - session.user.id set to:', session.user.id);
            } else {
                console.log('session - token.sub is undefined');
            }
            return session;
        },
    },
});
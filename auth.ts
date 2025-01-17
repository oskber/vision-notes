import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import User from '@/app/models/userModel';
import connectDB from './app/lib/connectDB';

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    providers: [
        Github(
            {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
             }),
        //CredentialsProvider({
        //     credentials: {
        //         email: {},
        //         password: {},
        //     },
        //     async authorize(credentials) {
        //         if (!credentials) return null;
        //
        //         try {
        //             const user = await User.findOne({
        //                 email: credentials?.email
        //             })
        //             console.log(user);
        //             if (user) {
        //                 const isMatch = await bcrypt.compare(
        //                     credentials.password as string,
        //                     user.password
        //                 );
        //
        //                 if (isMatch) {
        //
        //                     return {
        //                         id: user._id.toString(),
        //                         email: user.email,
        //                         name: user.name,
        //                     };
        //                 } else {
        //                     throw new Error('Email or Password is not correct');
        //                 }
        //             } else {
        //                 throw new Error('User not found');
        //             }
        //         } catch (error) {
        //             throw new Error(error as string);
        //         }
        //     },
        // }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!account || !profile) return false;

            await connectDB(); // Connect to your database

            if (account.provider === 'github') {
                const githubId = profile.id; // GitHub ID
                const email = profile.email; // GitHub email

                try {
                    // Find existing user in MongoDB
                    let existingUser = await User.findOne({ $or: [{ githubId }, { email }] });

                    if (!existingUser) {
                        // Create the user if not found
                        existingUser = await User.create({
                            githubId,
                            email,
                            name: profile.name,
                            image: profile.avatar_url,
                        });
                    }

                    // Attach the MongoDB user ID to the user object
                    user.id = existingUser._id.toString(); // Pass `_id` as `user.id`
                    console.log("signIn - User ID set to MongoDB _id:", user.id);

                    return true; // Allow sign-in to proceed
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false; // Deny sign-in on error
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                console.log("jwt - user:", user);
                token.sub = user.id || user._id?.toString(); // Persist the MongoDB `_id` in the token
                console.log("jwt - token.sub set to MongoDB ID:", token.sub);
            } else {
                console.log("jwt - no user, token.sub:", token.sub); // Persisting existing token.sub
            }
            return token;
        },

        // Pass the MongoDB user ID (_id) to client-side session
        async session({ session, token }) {
            console.log("session - received token.sub:", token.sub);

            if (token?.sub) {
                // Attach token.sub (MongoDB user ID) to session.user.id
                session.user.id = token.sub;
                console.log("session - session.user.id set to:", session.user.id);
            } else {
                console.log("session - token.sub is undefined");
            }
            return session;
        },
    },
});

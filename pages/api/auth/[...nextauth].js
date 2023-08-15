import { connectDB } from 'lib';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NotFoundError, ValidationError, verifyPassword } from 'utils';
import { validateAuthData } from './auth.validation';
import User from './user.model';

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;
                const isError = await validateAuthData({
                    email,
                    password,
                });

                if (isError) {
                    throw new ValidationError();
                }

                await connectDB();

                const currentUser = await User.findOne({ email });

                if (!currentUser) {
                    throw new NotFoundError('User not found', 401);
                }

                const isValid = await verifyPassword(
                    password,
                    currentUser.password
                );

                if (!isValid) {
                    throw new ValidationError('Wrong password');
                }

                return {
                    email: currentUser.email,
                    userId: currentUser._id.toString(),
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token, profile }) {
            if (user) {
                token.email = user.email;
                token.userId = user.userId;
            }
            await connectDB();

            if (profile) {
                const existingUser = await User.findOne({
                    email: profile.email,
                });

                if (!existingUser) {
                    const newUser = await User.create({
                        email: profile.email,
                    });

                    token.email = newUser.email;
                    token.userId = newUser._id.toString();
                } else {
                    token.userId = existingUser._id.toString();
                    token.email = existingUser.email;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = { userId: token.userId, email: token.email };
                return session;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth', // Custom sign-in page
        signOut: '/auth', // Custom sign-out page
        error: null, // Custom error page
        verifyRequest: null, // Custom email verification request page
        newUser: null, // Disable the default new user creation page
    },
};
export default NextAuth(authOptions);

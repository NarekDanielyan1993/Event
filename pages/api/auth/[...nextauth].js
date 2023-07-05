import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from 'constant';
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
    debug: process.env.NODE_ENV !== 'production',
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

                // Connect to MongoDB
                await connectDB();

                // Check if the user already exists
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

                return { email: currentUser.email };
            },
        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    pages: {
        signIn: '/auth', // Custom sign-in page
        signOut: '/auth', // Custom sign-out page
        error: null, // Custom error page
        verifyRequest: null, // Custom email verification request page
        newUser: null, // Disable the default new user creation page
    },
};
export default NextAuth(authOptions);

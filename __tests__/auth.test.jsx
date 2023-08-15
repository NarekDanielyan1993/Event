import { matchers } from '@emotion/jest';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '__mocks__/providers';
import AuthForm from 'components/auth/auth-form';
import { COMMON_ERROR_TYPES, MONGO_ERRORS } from 'constant';
import { nextJest as jest } from 'next/jest';

expect.extend(matchers);

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn((initialValue) => [initialValue, jest.fn()]),
}));

jest.mock('services/auth/index.js', () => ({
    useAuth: jest.fn(() => {
        return {
            signIn: jest.fn(),
            signUp: jest.fn(),
            signInWithGoogle: jest.fn(),
            isLoading: false,
            isLogin: false,
            setIsLogin: jest.fn(),
        };
    }),
}));

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: 'admin' },
    };
    return {
        __esModule: true,
        ...originalModule,
        signIn: jest.fn(),
        signUp: jest.fn(),
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'authenticated' };
        }),
    };
});

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null),
        };
    },
}));

// jest.mock('react-error-boundary', () => ({
//     useErrorBoundary: () => ({
//         ...jest.requireActual('react-error-boundary'),
//         showBoundary: jest.fn(),
//     }),
//     ErrorBoundary: jest.fn(({ children }) => <>{children}</>),
// }));

// const errorData = {
//     status: 200,
//     error: AUTH_ERROR_TYPES.NOT_FOUND.msg,
// };

describe('AuthPage', () => {
    it('Should switch to login form when after successfully signUp.', async () => {
        const { useAuth } = require('services/auth/index.js');
        const { signUp, signIn, signInWithGoogle } = useAuth();

        // signIn.mockRejectedValueOnce(new Error(errorData));
        // signUp.mockResolvedValueOnce();

        let isLogin = false;

        const setIsLogin = (login) => {
            isLogin = login;
        };

        expect(isLogin).toBe(false);

        signUp.mockImplementationOnce(async () => {
            setIsLogin(true);
        });

        const { getByLabelText, getByTestId, rerender } = render(
            <AuthForm
                isLogin={isLogin}
                onGoolgeLogIn={signInWithGoogle}
                onSignIn={signIn}
                onSignUp={signUp}
                setIsLogin={setIsLogin}
            />
        );

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const authButton = getByTestId('auth-submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, {
            target: { value: 'passwordNn454@' },
        });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(authButton).toHaveTextContent('Register');

        await waitFor(async () => await fireEvent.click(authButton));

        await waitFor(async () => {
            expect(signUp).toHaveBeenCalledTimes(1);
            rerender(
                <AuthForm
                    isLogin={isLogin}
                    onGoolgeLogIn={signInWithGoogle}
                    onSignIn={signIn}
                    onSignUp={signUp}
                    setIsLogin={setIsLogin}
                />
            );
            // const errorMessageElement = await authButton("button", { name: 'Register' });
            // expect(errorMessageElement).toBeInTheDocument();
            const authButton = getByTestId('auth-submit-button');
            expect(authButton).toHaveTextContent('Login');
        });
    });

    it('Should show error dialog when signUp fails.', async () => {
        const { useAuth } = require('services/auth/index.js');
        const { signUp, signIn, signInWithGoogle } = useAuth();

        const signUpErrorData = {
            status: MONGO_ERRORS.DUPLICATE.status,
            errors: [],
            msg: MONGO_ERRORS.DUPLICATE.msg,
            name: 'MongoServerError',
            title: COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
        };

        signUp.mockImplementationOnce(() => {
            throw new Error(signUpErrorData);
        });

        const { getByLabelText, getByTestId } = render(
            <AuthForm
                isLogin={false}
                onGoolgeLogIn={signInWithGoogle}
                onSignIn={signIn}
                onSignUp={signUp}
            />
        );

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const authButton = getByTestId('auth-submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, {
            target: { value: 'passwordNn454@' },
        });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(authButton).toHaveTextContent('Register');

        await waitFor(() => fireEvent.click(authButton));

        await waitFor(() => {
            expect(signUp).toHaveBeenCalledTimes(1);
            const errorDialog = getByLabelText('error-dialog');
            expect(errorDialog).toBeInTheDocument();
            // const errorDialog = getByTestId('error-dialog-test');
            // expect(errorDialog).toBeVisible()
        });
    });

    // it('submits login form successfully', () => {
    //     const { signIn, signUp, signInWithGoogle } = jest.requireMock(
    //         'services/auth/index.js'
    //     );
    //     render(
    //         <AuthForm />
    //     );

    //     fireEvent.submit(screen.getByRole('form'));

    //     expect(signIn).toHaveBeenCalled();
    //     expect(mockSetIsLogin).toHaveBeenCalledWith(true);
    // });
});

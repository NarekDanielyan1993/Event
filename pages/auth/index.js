import AuthForm from 'components/auth/auth-form';
import Loader from 'components/loader';
import { AUTH_REDIRECT_PATH, METHODS } from 'constant';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { apiRequest } from 'utils';

const AuthPage = () => {
    const { data: session, status } = useSession();

    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);

    if (session) {
        router.push('/events');
    }

    const { showBoundary } = useErrorBoundary();

    const [isLoading, setIsLoading] = useState(false);

    const onSignInHandler = async (formData) => {
        setIsLoading(true);
        const { error, status } = await signIn('credentials', {
            callbackUrl: AUTH_REDIRECT_PATH,
            redirect: false,
            ...formData,
        });

        if (error) {
            const err = { msg: error, status };
            showBoundary(err);
        } else {
            setIsLogin(false);
        }
        setIsLoading(false);
    };

    const onSignUpHandler = async (formData) => {
        try {
            setIsLoading(true);
            await apiRequest(METHODS.POST, '/api/auth/signup', formData);
            setIsLogin(true);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    const googleLoginHandler = () => {
        signIn('google');
    };

    return (
        <>
            {isLoading || 'loading' === status || 'authenticated' === status ? (
                <Loader />
            ) : (
                <>
                    <AuthForm
                        isLogin={isLogin}
                        key={isLogin}
                        onGoolgeLogIn={googleLoginHandler}
                        onSignIn={onSignInHandler}
                        onSignUp={onSignUpHandler}
                        setIsLogin={setIsLogin}
                    />
                </>
            )}
        </>
    );
};

export default AuthPage;

AuthPage.layout = ({ children }) => <>{children}</>;

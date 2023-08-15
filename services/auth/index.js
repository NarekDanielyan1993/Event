import { AUTH_ROUTES, METHODS } from 'constant';
import useNotification from 'hooks/useNotification';
import { signIn as nextSignIn } from 'next-auth/react';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { apiRequest } from 'utils';

export const useAuth = () => {
    const { successSnackbar } = useNotification();

    const { showBoundary } = useErrorBoundary();

    const [isLogin, setIsLogin] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (formData) => {
        setIsLoading(true);
        const { error, status } = await nextSignIn('credentials', {
            redirect: false,
            callbackUrl: AUTH_ROUTES.SUCCESS,
            ...formData,
        });

        if (error) {
            const err = { msg: error, status };
            showBoundary(err);
        }
        setIsLoading(false);
    };

    const signUp = async (formData) => {
        try {
            setIsLoading(true);
            await apiRequest({
                method: METHODS.POST,
                url: '/api/auth/signup',
                body: formData,
            });
            successSnackbar('You has been successfully registered.');
            setIsLogin(true);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        await nextSignIn('google', { callbackUrl: AUTH_ROUTES.SUCCESS });
    };

    return {
        signInWithGoogle,
        signIn,
        signUp,
        setIsLogin,
        isLogin,
        isLoading,
    };
};

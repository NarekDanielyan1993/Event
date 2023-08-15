import Loader from 'components/loader';
import { AUTH_ROUTES, SESSION_STATUS } from 'constant';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const AuthRoute = ({ children }) => {
    const router = useRouter();
    const { status } = useSession({
        required: true,
    });
    console.log('status', status);

    useEffect(() => {
        if (status === SESSION_STATUS.LOADING || !router.isReady) {
            return;
        }

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (SESSION_STATUS.UNAUTHENTICATED === status) {
            router.push({
                pathname: AUTH_ROUTES.BASE,
                query: { returnUrl: router.asPath },
            });
        }
    }, [status, router]);

    if (SESSION_STATUS.LOADING === status) {
        return <Loader />;
    }
    return SESSION_STATUS.AUTHENTICATED === status && children;
};

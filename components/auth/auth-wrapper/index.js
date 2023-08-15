import { AUTH_ROUTES } from 'constant';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth =
    ({ path = AUTH_ROUTES.SUCCESS }) =>
    (WrappedComponent) => {
        const Wrapped = (props) => {
            const { data: session } = useSession();
            const router = useRouter();

            if (session) {
                return router.push(path);
            }

            // if (status === SESSION_STATUS.LOADING) {
            //     return <Loader />;
            // }

            return <WrappedComponent {...props} />;
        };

        return Wrapped;
    };

export default withAuth;

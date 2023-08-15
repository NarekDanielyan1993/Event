import Loader from 'components/loader';
import { SESSION_STATUS } from 'constant';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = ({ path = SESSION_STATUS.LOADING }) => (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const { status } = useSession();
        const router = useRouter();
        
        if (status === SESSION_STATUS.AUTHENTICATED) {
            path && router.push(path);
            return;
        }

        if (status === SESSION_STATUS.LOADING) {
            return <Loader />;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;

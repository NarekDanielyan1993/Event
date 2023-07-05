import Loader from 'components/loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const AuthWrapper = ({ children }) => {
    const router = useRouter();

    const { status } = useSession({
        required: true,
        onUnauthenticated: () => router.push('/auth'),
    });

    return 'loading' === status ? <Loader /> : children;
};

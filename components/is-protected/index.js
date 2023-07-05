import { AuthWrapper } from 'components/auth/auth-wrapper';

const IsProtected = ({ component: Component, pageProps }) => {
    return Component.auth ? (
        <AuthWrapper>
            <Component {...pageProps} />
        </AuthWrapper>
    ) : (
        <Component {...pageProps} />
    );
};

export default IsProtected;

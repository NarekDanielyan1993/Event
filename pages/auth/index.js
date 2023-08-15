import AuthForm from 'components/auth/auth-form';
import { StyledAuthContainer } from 'components/auth/auth-form/style';
import withAuth from 'components/hoc/with-auth';
import Loader from 'components/loader';
import { AUTH_ROUTES } from 'constant';
import { useAuth } from 'services/auth';

const AuthPage = () => {
    const { setIsLogin, isLogin, signIn, signUp, signInWithGoogle, isLoading } =
        useAuth();

    return (
        <StyledAuthContainer>
            {isLoading && <Loader />}
            <AuthForm
                isLogin={isLogin}
                key={isLogin}
                onGoolgeLogIn={signInWithGoogle}
                onSignIn={signIn}
                onSignUp={signUp}
                setIsLogin={setIsLogin}
            />
        </StyledAuthContainer>
    );
};

const withAutPage = withAuth({ path: AUTH_ROUTES.SUCCESS })(AuthPage);

withAutPage.layout = ({ children }) => <>{children}</>;

export default withAutPage;

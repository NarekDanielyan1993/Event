import { ErrorContainer, ErrorMessage, Title } from 'styles/style500';

const Error500Page = () => {
    return (
        <ErrorContainer>
            <Title>Oops! Something went wrong.</Title>
            <ErrorMessage>
                Please try refreshing the page or contact support if the problem
                persists.
            </ErrorMessage>
        </ErrorContainer>
    );
};

export default Error500Page;

Error500Page.layout = ({ children }) => <>{children}</>;

import Loader from 'components/loader';
import { useRouter } from 'next/router';
import { useUnsubcribeFromEmail } from 'services';
import {
    StyledUnsubscribeButton,
    StyledUnsubscribeContainer,
    StyledUnsubscribeHeader,
    StyledUnsubscribeText,
} from './style';

const Unsubscribe = () => {
    const { unsubcribeFromEmail, isLoading } = useUnsubcribeFromEmail();
    const router = useRouter();
    const { email } = router.query;

    const unsubscribeFormEmailHandler = async (email) => {
        await unsubcribeFromEmail({ email });
    };

    return (
        <StyledUnsubscribeContainer>
            {isLoading ? <Loader /> : null}
            <StyledUnsubscribeHeader>UNSUBSCRIBE</StyledUnsubscribeHeader>
            <StyledUnsubscribeText>
                By clicking the Unsubscribe button, you will no longer receive
                notifications from the sender. We appreciate your previous
                engagement and respect your decision to opt-out. Thank you.
            </StyledUnsubscribeText>
            <StyledUnsubscribeButton
                onClick={() => unsubscribeFormEmailHandler(email)}
            >
                Unsubscribe
            </StyledUnsubscribeButton>
        </StyledUnsubscribeContainer>
    );
};

export default Unsubscribe;

Unsubscribe.layout = ({ children }) => <>{children}</>;

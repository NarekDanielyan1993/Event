import {
    StyledUnsubscribeButton,
    StyledUnsubscribeContainer,
    StyledUnsubscribeHeader,
    StyledUnsubscribeText,
} from './style';

export default function UnsubscibeCard({ onUnsubscribeFromEmail }) {
    return (
        <StyledUnsubscribeContainer>
            <StyledUnsubscribeHeader>UNSUBSCRIBE</StyledUnsubscribeHeader>
            <StyledUnsubscribeText>
                By clicking the Unsubscribe button, you will no longer receive
                notifications from the sender. We appreciate your previous
                engagement and respect your decision to opt-out. Thank you.
            </StyledUnsubscribeText>
            <StyledUnsubscribeButton onClick={onUnsubscribeFromEmail}>
                Unsubscribe
            </StyledUnsubscribeButton>
        </StyledUnsubscribeContainer>
    );
}

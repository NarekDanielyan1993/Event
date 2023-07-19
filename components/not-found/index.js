import {
    StyledNotFounWrapper,
    StyledNotFound,
    StyledNotFoundIcon,
    StyledNotFoundText,
} from './style';

function NotFound({ text, withIcon = true }) {
    return (
        <StyledNotFound>
            <StyledNotFounWrapper>
                {withIcon && <StyledNotFoundIcon />}
                <StyledNotFoundText>{text || 'Not Found'}</StyledNotFoundText>
            </StyledNotFounWrapper>
        </StyledNotFound>
    );
}

export default NotFound;

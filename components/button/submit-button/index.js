import { StyledSubmitButton } from './style';

const SubmitButton = ({ children, ...props }) => {
    return <StyledSubmitButton {...props}>{children}</StyledSubmitButton>;
};

export default SubmitButton;

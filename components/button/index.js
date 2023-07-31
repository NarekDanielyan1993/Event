import StyledButton from './style';

const Button = ({ className, ...props }) => {
    return <StyledButton className={className} {...props} />;
};

export default Button;

import useForm from 'hooks/useForm.js';

import { Typography } from '@mui/material';
import Button from 'components/button';
import { AuthProvider } from '../auth-providers';
import { StyledForm } from './style';
import { validationSchema } from './validationSchema';

export default function AuthForm({
    onSignUp,
    onSignIn,
    onGoolgeLogIn,
    setIsLogin,
    isLogin,
}) {
    const { FormField, handleSubmit } = useForm({
        validationSchema: validationSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <StyledForm onSubmit={handleSubmit(isLogin ? onSignIn : onSignUp)}>
            <Typography>{isLogin ? 'Login' : 'Register'}</Typography>
            {FormField({
                name: 'email',
                label: 'Email',
            })}
            {FormField({
                name: 'password',
                type: 'password',
                label: 'Password',
            })}
            <Button
                className="auth"
                data-testid="auth-submit-button"
                type="submit"
                variant="contained"
            >
                {isLogin ? 'Login' : 'Register'}
            </Button>
            <AuthProvider onGoolgeLogIn={onGoolgeLogIn} />
            <Button onClick={() => setIsLogin((prev) => !prev)}>
                {isLogin ? 'Register' : 'Login'}
            </Button>
        </StyledForm>
    );
}

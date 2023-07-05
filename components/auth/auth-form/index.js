import { Button, Typography } from '@mui/material';
import useForm from 'hooks/useForm.js';

import { AuthProvider } from '../auth-providers';
import { StyledContainer, StyledForm } from './style';
import { validationSchema } from './validationSchema';

export default function AuthForm({
    onSignUp,
    onGoolgeLogIn,
    onSignIn,
    isLogin,
    setIsLogin,
}) {
    const { FormField, handleSubmit } = useForm({
        validationSchema: validationSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <StyledContainer>
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
                <Button color="primary" type="submit" variant="contained">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                <AuthProvider onGoolgeLogIn={onGoolgeLogIn} />
                <Button onClick={() => setIsLogin((prev) => !prev)}>
                    {isLogin ? 'Register' : 'Login'}
                </Button>
            </StyledForm>
        </StyledContainer>
    );
}

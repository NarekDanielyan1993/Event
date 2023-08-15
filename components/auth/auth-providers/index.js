import { Box } from '@mui/material';
import { IconButton } from 'components/button/icon-button';

export const AuthProvider = ({ onGoolgeLogIn }) => {
    const providers = [
        {
            name: 'google',
            fn: onGoolgeLogIn,
            tooltipText: 'Sign in with google',
        },
    ];
    return (
        <Box display="flex" gap="10px" justifyContent="center">
            {providers.map((provider, i) => (
                <IconButton
                    key={i}
                    name={provider.name}
                    onClick={provider.fn}
                    tooltipText={provider.tooltipText}
                />
            ))}
        </Box>
    );
};

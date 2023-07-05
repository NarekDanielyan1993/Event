import { Box } from '@mui/material';
import { IconButton } from 'components/button/icon-button';

export const AuthProvider = ({ onGoolgeLogIn }) => {
    return (
        <Box display={'flex'} gap={'10px'} justifyContent={'center'}>
            <IconButton
                iconName="google"
                onClick={onGoolgeLogIn}
                tooltipText="Sign in with google"
            />
        </Box>
    );
};

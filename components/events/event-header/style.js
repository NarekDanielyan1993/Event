import { styled } from '@mui/material/styles';

export const StyledEventHeader = styled('div')(({ theme }) => ({
    '&': {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.secondary,
    },
}));

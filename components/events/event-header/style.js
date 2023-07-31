import { styled } from '@mui/system';

export const StyledEventHeader = styled('div')(({ theme }) => ({
    '&': {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.secondary,
    },
}));

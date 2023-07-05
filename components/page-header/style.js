import { styled } from '@mui/system';

export const StyledPageHeader = styled('header')(({ theme }) => ({
    '&': {
        height: theme.spacing(8),
        backgroundColor: theme.palette.background.secondary,
        padding: `0 ${theme.spacing(1)}`,
    },
}));

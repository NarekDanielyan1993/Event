import { styled } from '@mui/material/styles';

export const StyledPageHeader = styled('header')(({ theme }) => ({
    '&': {
        height: theme.spacing(8),
        backgroundColor: theme.palette.background.secondary,
        padding: `0 ${theme.spacing(1)}`,
    },
}));

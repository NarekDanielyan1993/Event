import { styled } from '@mui/material/styles';

export const StyledMobileMenu = styled('div')(({ theme }) => ({
    display: 'none',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

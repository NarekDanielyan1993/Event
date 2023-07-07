import { styled } from '@mui/system';

export const StyledMobileMenu = styled('div')(({ theme }) => ({
    display: 'none',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

import { styled } from '@mui/system';

export const StyledNav = styled('nav')(({ theme }) => ({
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const StyledRightSide = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: '10px',
    color: theme.palette.primary.main,
    transition: `color ${theme.transitions.duration.longer} ${theme.transitions.easing.easeInOut}`,
}));

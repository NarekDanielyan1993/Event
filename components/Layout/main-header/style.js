import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMainHeader = styled('header')(() => ({
    display: 'flex',
    backgroundColor: 'black',
    padding: '12px 16px',
}));

export const StyledLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: `color ${theme.transitions.duration.longer} ${theme.transitions.easing.easeInOut}`,
    fontSize: theme.spacing(2.5),

    '&:hover': {
        color: theme.palette.primary.darker,
    },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    transition: `color ${theme.transitions.duration.longer} ${theme.transitions.easing.easeInOut}`,
    fontSize: theme.spacing(2.5),
    padding: 0,

    '&:hover': {
        color: theme.palette.primary.darker,
    },
}));

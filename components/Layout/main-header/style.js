import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledMainHeader = styled('header')(() => ({
    display: 'flex',
    backgroundColor: 'black',
    padding: '12px 16px',
}));

export const StyledNav = styled('nav')(({ theme }) => ({
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontSize: theme.spacing(2),
    textTransform: 'uppercase',
}));

export const StyledLogo = styled('div')(({ theme }) => ({
    '& > a': {
        color: theme.palette.primary.main,
        transition: `color ${theme.transitions.duration.longer} ${theme.transitions.easing.easeInOut}`,
    },
    '&:hover > a': {
        color: theme.palette.primary.darker,
    },
}));

export const StyledLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
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

    '&:hover': {
        color: theme.palette.primary.darker,
    },
}));

export const StyledRightSide = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: '5px',
    color: theme.palette.primary.main,
    transition: `color ${theme.transitions.duration.longer} ${theme.transitions.easing.easeInOut}`,
}));

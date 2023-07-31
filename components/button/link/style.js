import { Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledMuiLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    transition: '0.5s ease',
    '&:hover': {
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.primary.darker,
        },
    },
}));

export default StyledMuiLink;

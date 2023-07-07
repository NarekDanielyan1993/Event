import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'aqua',
    display: 'inline-block',
    color: 'white',
    padding: '8.5px 10px',
    borderRadius: '4px',

    '&:hover': {
        backgroundColor: theme.palette.primary.darker,
        color: '#eee',
    },
}));

import TextField from '@mui/material/TextField';
import { darken, styled } from '@mui/material/styles';

export const styleMuiTextField = (theme) => ({
    '& textarea': {
        resize: 'none',
    },
    '& label.Mui-focused': {
        color: theme.palette.primary.darker,
    },
    '& label': {
        color: theme.palette.primary.main,
    },
    '&:hover label': {
        color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.darker,
        },
    },
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
    ...styleMuiTextField(theme),
}));

export const StyledFileInput = styled('input')(({ theme }) => ({
    '&': {
        width: '100%',
    },
    '&:focus': {
        outline: 'none',
    },
    '&:hover': {
        cursor: 'pointer',
    },
    '&::file-selector-button': {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: theme.spacing(0.5),
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        border: 'none',
        outline: 'none',
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.3),
        },
    },
    '&::file-selector-button-text': {
        pointerEvents: 'none',
    },
}));

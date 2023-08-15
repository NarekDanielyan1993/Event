import { Button } from '@mui/material';
import { darken, styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    '&': {
        transition: '0.5s ease',
        '&:hover': {
            color: darken(theme.palette.primary.main, 0.4),
        },
    },
    '&.auth': {
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.4),
        },
    },
    '&.clear': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.4),
        },
    },
    '&.delete': {
        color: theme.palette.error.main,
        '&:hover': {
            color: theme.palette.error.darken,
        },
    },
    '&.success': {
        background: '#4CAF50',
        color: '#FFFFFF',
        '&:hover': {
            background: '#388E3C',
        },
    },
    '&.submit': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,

        '&:hover': {
            backgroundColor: theme.palette.secondary.darken,
        },
    },
    '&.textToggle': {
        display: 'block',
        fontSize: theme.spacing(1.2),
        padding: `${theme.spacing(0.1)} ${theme.spacing(0.6)}`,
        color: theme.palette.common.white,
    },
    '&.toggle': {
        marginBottom: theme.spacing(2),
        border: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing(0.3),

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
        },
    },
}));

export default StyledButton;

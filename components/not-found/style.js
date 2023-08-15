import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutline from 'components/icons/error-outline';

export const StyledNotFound = styled(Box)(() => ({
    '&': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

export const StyledNotFounWrapper = styled(Box)(({ theme }) => ({
    '&': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px auto',
        padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
        maxWidth: theme.spacing(50),
        border: '2px solid red',
        borderRadius: theme.spacing(0.5),
        textAlign: 'center',
    },
}));

export const StyledNotFoundText = styled('p')(({ theme }) => ({
    '&': {
        fontWeight: 'bold',
        marginTop: theme.spacing(2),
        color: theme.palette.text.primary,
        textAlign: 'center',
    },
}));

export const StyledNotFoundIcon = styled(ErrorOutline)(({ theme }) => ({
    '&': {
        marginTop: theme.spacing(2),
        fontSize: '4rem',
        marginBottom: theme.spacing(1.5),
        color: theme.palette.text.secondary,
    },
}));

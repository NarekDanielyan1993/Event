import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledNotFound = styled(Box)(({ theme }) => ({
    '&': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    '& .not-found-icon': {
        fontSize: '4rem',
        marginBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    '&  .not-found-text': {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
        textAlign: 'center',
    },
}));

export default StyledNotFound;

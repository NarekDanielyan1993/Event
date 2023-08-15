import { styled } from '@mui/material/styles';

export const StyledLogisticContent = styled('section')(({ theme }) => ({
    '&': {
        fontSize: theme.spacing(2.5),
        color: theme.palette.text.secondary,
        width: '90%',
        maxWidth: '40em',
        margin: 'auto',
        marginTop: theme.spacing(20),
        textAlign: 'center',
    },
}));

import { styled } from '@mui/material/styles';

const StyledLogisticSummary = styled('section')(({ theme }) => ({
    '&': {
        width: '100%',
        backgroundImage: `linear-gradient(to bottom left,  ${theme.palette.primary.lighter}, ${theme.palette.primary.darker})`,
    },

    '& h1': {
        margin: 0,
        paddingTop: theme.spacing(6),
        fontSize: theme.spacing(4),
        textAlign: 'center',
        textShadow: theme.palette.textShadows,
        color: 'white',
    },

    [theme.breakpoints.up('sm')]: {
        '& h1': {
            fontSize: theme.spacing(10),
        },
    },
}));

export default StyledLogisticSummary;

import { styled } from '@mui/material/styles';

export const StyledLogisticItem = styled('li')(({ theme }) => ({
    '&': {
        display: 'flex',
        fontSize: theme.spacing(2.5),
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: theme.palette.text.primary,
    },

    '& span': {
        display: 'block',
    },

    '& .icon': {
        marginRight: theme.spacing(2),
        color: theme.palette.text.secondary,
    },

    '& .icon svg': {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    [theme.breakpoints.up('sm')]: {
        '&': {
            alignItems: 'flex-start',
            textAlign: 'left',
        },
    },
}));

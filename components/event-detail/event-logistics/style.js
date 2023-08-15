import { styled } from '@mui/material/styles';

export const StyledLogistics = styled('section')(({ theme }) => ({
    '&': {
        boxShadow: theme.shadows[1],
        borderRadius: theme.spacing(0.8),
        backgroundColor: theme.palette.background.main,
        padding: theme.spacing(4),
        maxWidth: '50rem',
        width: '80%',
        margin: `${theme.spacing(6)} auto`,
        color: theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'space-between',
        gap: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',

        '& .image': {
            width: theme.spacing(16),
            height: theme.spacing(16),
            borderRadius: '50%',
            overflow: 'hidden',
            border: `${theme.spacing(0.6)} solid white`,

            '& .img': {
                width: theme.spacing(16),
                height: theme.spacing(16),
                objectFit: 'cover',
            },
        },

        '& .list': {
            flex: 3,
            display: 'flex',
            gap: theme.spacing(4),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
    },

    // Media query styles for screens with minimum width of 768px (sm breakpoint)
    [theme.breakpoints.up('sm')]: {
        '&': {
            padding: theme.spacing(2),
            margin: '0 auto',
            gap: theme.spacing(3),
            flexDirection: 'row',
            alignItems: 'stretch',
        },

        '& .image': {
            width: '15rem',
            height: '15rem',
        },

        '& .image img': {
            width: '15rem',
            height: '15rem',
        },

        '& .list': {
            alignItems: 'flex-start',
        },
    },
}));

import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Image from 'next/image';

export const StyledEventCard = styled('div')(({ theme }) => ({
    position: 'relative',
    maxWidth: '280px',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.boxShadows[2],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
}));

export const StyledOverlay = styled('div')(({ theme }) => ({
    '&': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 2,
        opacity: 0,
        transition: '0.5s ease',

        '& .actions': {
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
            transition: '0.5s ease',
            transform: 'translate(-50%, 50%)',
        },
    },

    '&:hover': {
        opacity: 1,
    },

    '&:hover .actions': {
        bottom: '50%',
    },
}));

export const StyledText = styled(Typography)(() => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}));

export const StyledContent = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1.5),
    gap: theme.spacing(2),
    textAlign: 'center',
}));

export const StyledImage = styled(Image)(({ theme }) => ({
    '&': {
        width: '100%',
        display: 'block',
        height: theme.spacing(26),
        objectFit: 'fill',
        borderRadius: '5px',
    },
}));

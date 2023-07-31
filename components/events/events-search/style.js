import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    gap: '4px',
    maxWidth: theme.spacing(60),
    width: '100%',
    margin: '30px auto 20px',
    border: '1px solid black',
    borderRadius: '4px',
    padding: theme.spacing(1.2),
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

export const StyledButton = styled(Button)(() => ({
    minWidth: '150px',
    flexGrow: 1,
}));

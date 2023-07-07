import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    gap: '4px',
    marginBottom: '50px',
    maxWidth: '500px',
    width: '100%',
    margin: '30px auto 20px',
    border: '1px solid black',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: 'white',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
    },
}));

export const StyledButton = styled(Button)(() => ({
    minWidth: '150px',
    flexGrow: 1,
}));

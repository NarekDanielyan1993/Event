import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledUnsubscribeContainer = styled('div')(({ theme }) => ({
    maxWidth: theme.spacing(80),
    width: '100%',
    margin: `${theme.spacing(6)} auto`,
    padding: theme.spacing(2),
    backgroundColor: '#eee',
    textAlign: 'center',
}));

export const StyledUnsubscribeHeader = styled('h4')(({ theme }) => ({
    fontSize: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
}));

export const StyledUnsubscribeText = styled('p')(({ theme }) => ({
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
}));

export const StyledUnsubscribeButton = styled(Button)(({ theme }) => ({
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    color: 'white',
    backgroundColor: '#000000',
    padding: `${theme.spacing(1.5)}, ${theme.spacing(2)}`,

    '&:hover': {
        backgroundColor: '#1a1a1a',
        color: 'white',
    },
}));

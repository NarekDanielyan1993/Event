import { Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));

const StyledForm = styled('form')(({ theme }) => ({
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '3px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: theme.shadows[2],
}));

export { StyledContainer, StyledForm };

import { styled } from '@mui/material/styles';

const StyledAuthContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)'
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
    // boxShadow: theme.boxShadows[2],
}));

export { StyledAuthContainer, StyledForm };

import { styled } from '@mui/material/styles';

export const StyledNewsLetterContainer = styled('section')({
    maxWidth: '400px',
    width: '100%',
    margin: '30px auto 20px',
});

export const StyledNewsLetterTitle = styled('h2')({
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 600,
});

export const StyledNewsLetterForm = styled('form')({
    display: 'flex',
    padding: '29px 12px',
    backgroundColor: 'white',
    borderRadius: '2px',
    alignItems: 'flex-start',
    gap: '5px',
});

import { styled } from '@mui/system';

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
    height: '96px',
    marginTop: '15px',
    display: 'flex',
    padding: '29px 12px',
    backgroundColor: 'white',
    borderRadius: '2px',
    gap: '5px',
});

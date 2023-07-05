import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledEventCommentContainer = styled('div')(() => ({
    width: '40%',
    margin: '50px auto 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const StyledEventButton = styled(Button)(() => ({
    display: 'inline-block',
    maxWidth: '250px',
    width: '100%',
    marginBottom: '20px',
    border: '1px solid lightseagreen',
    color: 'lightseagreen',
    backgroundColor: 'white',
    padding: '8px 12px',
    borderRadius: '5px',

    '&:hover': {
        backgroundColor: 'lightseagreen',
        color: 'white',
    },

    '&:disabled': {
        backgroundColor: 'lightgray',
        color: 'white',
    },
}));

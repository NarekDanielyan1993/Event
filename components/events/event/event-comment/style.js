import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledEventCommentContainer = styled('div')(({ theme }) => ({
    width: '50%',
    margin: '50px auto 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '98%',
    },
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

    // '&:disabled': {
    //     backgroundColor: 'lightgray',
    //     color: 'white',
    // },
}));

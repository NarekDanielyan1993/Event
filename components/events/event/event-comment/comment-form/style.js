import { styled } from '@mui/system';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '12px',
}));

export default StyledForm;

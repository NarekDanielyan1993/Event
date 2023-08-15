import { styled } from '@mui/material/styles';

const StyledEventListContainer = styled('ul')(() => ({
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: 0,
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '20px',
    columnGap: '10px',
    listStyleType: 'none',
}));

export default StyledEventListContainer;

import { styled } from '@mui/system';

const StyledEventList = styled('ul')(() => ({
    maxWidth: '80%',
    margin: '0 auto',
    padding: 0,
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '20px',
    columnGap: '10px',
    listStyleType: 'none',
}));

export default StyledEventList;

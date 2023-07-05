import { styled } from '@mui/system';

export const StyledCommentWrapper = styled('div')(() => ({
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightseagreen',
    gap: '10px',
    padding: '8px 12px 10px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',

    '& .author': {
        fontSize: '18px',
        fontWeight: 'bold',
    },
}));

export default StyledCommentWrapper;

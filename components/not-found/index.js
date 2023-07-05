import { ErrorOutline } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import StyledNotFound from './style';

function NotFound({ text }) {
    return (
        <StyledNotFound>
            <IconButton>
                <ErrorOutline className="not-found-icon" />
            </IconButton>
            <Typography className="not-found-text" variant="h5">
                {text || 'Not Found'}
            </Typography>
        </StyledNotFound>
    );
}

export default NotFound;

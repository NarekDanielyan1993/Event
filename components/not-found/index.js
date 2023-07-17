import { ErrorOutline } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import StyledNotFound from './style';

function NotFound({ text, withIcon }) {
    return (
        <StyledNotFound>
            {withIcon && (
                <IconButton>
                    <ErrorOutline className="not-found-icon" />
                </IconButton>
            )}
            <Typography className="not-found-text" my={3} variant="h5">
                {text || 'Not Found'}
            </Typography>
        </StyledNotFound>
    );
}

export default NotFound;

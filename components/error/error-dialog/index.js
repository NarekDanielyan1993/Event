import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

import { transformErrorData } from 'utils';
import { StyledDialog } from './style';

function ErrorDialog({ open, onClose, error }) {
    const errorObject = transformErrorData(error);

    return (
        <StyledDialog
            aria-label="error-dialog"
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <DialogTitle sx={{ backgroundColor: 'red', color: 'white' }}>
                {errorObject.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{errorObject.msg}</Typography>
                {errorObject?.errors.map((err) => (
                    <Typography key={err}>{err}</Typography>
                ))}
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={onRetry}>Retry</Button> */}
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </StyledDialog>
    );
}

export default ErrorDialog;

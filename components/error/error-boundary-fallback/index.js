import ErrorDialog from '../error-dialog';

export function Fallback({ error, resetErrorBoundary }) {
    return (
        <ErrorDialog
            error={error}
            onClose={resetErrorBoundary}
            open={!!error}
        />
    );
}

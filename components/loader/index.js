import { Box, CircularProgress } from '@mui/material';

function Loader() {
    return (
        <Box
            alignItems="center"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            bottom={0}
            display="flex"
            justifyContent="center"
            left={0}
            position="fixed"
            right={0}
            top={0}
            zIndex={9999}
        >
            <CircularProgress />
        </Box>
    );
}

export default Loader;

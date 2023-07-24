import { Box, CircularProgress } from '@mui/material';

function Loader({ fixed = true, withOverlay = true }) {
    return (
        <Box
            alignItems="center"
            {...(withOverlay && { backgroundColor: 'rgba(0, 0, 0, 0.5)' })}
            bottom={0}
            display="flex"
            justifyContent="center"
            left={0}
            position={fixed ? 'fixed' : 'relative'}
            py={10}
            right={0}
            top={0}
            zIndex={9999}
        >
            <CircularProgress />
        </Box>
    );
}

export default Loader;

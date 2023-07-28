import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: '#4CAF50',
            darker: '#388E3C',
            lighter: '#81C784',
        },
        secondary: {
            main: '#2196F3',
        },
        error: {
            main: '#FF5722',
        },
        text: {
            primary: '#333',
            secondary: '#FFFFFF',
        },
        background: {
            main: '#8BC34A',
            secondary: 'lightgrey',
            paper: '#E8F5E9',
        },
        gradient: {
            primary: 'linear-gradient(to bottom left, #388E3C, #81C784)',
        },
    },
    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        },
        duration: {
            shorter: '.2s',
            longer: '.3s',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 600,
        },
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0, 0, 0, 0.2)',
        '0px 4px 8px rgba(0, 0, 0, 0.2)',
        '0px 8px 16px rgba(0, 0, 0, 0.2)',
        '0px 16px 24px rgba(0, 0, 0, 0.2)',
    ],
    textShadows: {
        primary: '0 3px 10px rgba(0, 0, 0, 0.5)',
    },
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: () => theme.palette.background.default,
                },
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                fontSize: '1rem',
                '@media (max-width: 320px)': {
                    fontSize: '0.8rem', // Font size for screens up to 320px width (e.g., mobile portrait)
                },
                '@media (min-width: 321px) and (max-width: 600px)': {
                    fontSize: '1rem', // Font size for screens between 321px and 600px width (e.g., mobile landscape)
                },
                '@media (min-width: 601px) and (max-width: 960px)': {
                    fontSize: '1.2rem', // Font size for screens between 601px and 960px width (e.g., tablets)
                },
                '@media (min-width: 961px) and (max-width: 1280px)': {
                    fontSize: '1.5rem', // Font size for screens between 961px and 1280px width (e.g., small laptops)
                },
                '@media (min-width: 1281px)': {
                    fontSize: '2rem', // Font size for screens above 1280px width (e.g., large laptops and desktops)
                },
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: {
                fontSize: '1rem',
                '@media (max-width: 320px)': {
                    fontSize: '0.8rem',
                },
                '@media (min-width: 321px) and (max-width: 600px)': {
                    fontSize: '1rem',
                },
                '@media (min-width: 601px) and (max-width: 960px)': {
                    fontSize: '1.2rem',
                },
                '@media (min-width: 961px) and (max-width: 1280px)': {
                    fontSize: '1.5rem',
                },
                '@media (min-width: 1281px)': {
                    fontSize: '2rem',
                },
            },
        },
    },
});

export default theme;

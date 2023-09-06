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
            main: '#00FFFF',
            darken: '#00CCCC',
        },
        error: {
            main: '#CC0000',
            darken: '#990000',
        },
        text: {
            main: '#333',
        },
        common: {
            white: '#FFFFFF',
            black: '#000000',
        },
        disabled: {
            main: '#BDBDBD',
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
    boxShadows: [
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
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        '&:disabled': {
                            opacity: '0.4!important',
                        },
                        whiteSpace: 'nowrap',
                        minWidth: 'max-content',
                        padding: `${theme.typography.pxToRem(
                            10
                        )} ${theme.typography.pxToRem(14)}`,
                        textTransform: 'uppercase',
                        [theme.breakpoints.up('xs')]: {
                            fontSize: theme.typography.pxToRem(14),
                            lineHeight: theme.typography.pxToRem(20),
                        },
                        [theme.breakpoints.up('sm')]: {
                            fontSize: theme.typography.pxToRem(18),
                            lineHeight: theme.typography.pxToRem(20),
                        },
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18),
                            lineHeight: theme.typography.pxToRem(20),
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: theme.typography.pxToRem(18),
                            lineHeight: theme.typography.pxToRem(22),
                        },
                        [theme.breakpoints.up('xl')]: {
                            fontSize: theme.typography.pxToRem(22),
                            lineHeight: theme.typography.pxToRem(24),
                        },
                    };
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        padding: `${theme.typography.pxToRem(
                            10
                        )} ${theme.typography.pxToRem(12)}`,
                        textTransform: 'uppercase',
                        [theme.breakpoints.up('xs')]: {
                            fontSize: theme.typography.pxToRem(14),
                            lineHeight: theme.typography.pxToRem(16),
                        },
                        [theme.breakpoints.up('sm')]: {
                            fontSize: theme.typography.pxToRem(16),
                            lineHeight: theme.typography.pxToRem(18),
                        },
                        [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.pxToRem(18),
                            lineHeight: theme.typography.pxToRem(20),
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: theme.typography.pxToRem(18),
                            lineHeight: theme.typography.pxToRem(22),
                        },
                        [theme.breakpoints.up('xl')]: {
                            fontSize: theme.typography.pxToRem(22),
                            lineHeight: theme.typography.pxToRem(24),
                        },
                    };
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.common.white,
                        [theme.breakpoints.down('sm')]: {
                            minHeight: theme.spacing(2),
                            fontSize: theme.spacing(1.2),
                        },
                    };
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: ({ theme }) => {
                    return {
                        [theme.breakpoints.down('sm')]: {
                            orientation: 'vertical',
                        },
                    };
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        [theme.breakpoints.down('sm')]: {
                            minHeight: theme.spacing(1),
                        },
                    };
                },
            },
        },
    },
});

export default theme;

'use client';

import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from 'components/Layout';
import { Fallback } from 'components/error/error-boundary-fallback';
import IsProtected from 'components/is-protected';
import { AUTH_SESSION_OPTIONS } from 'constant';
import useGetLayout from 'hooks/useGetLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createEmotionCache, logError } from 'utils';
import '../styles/globals.css';
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps: { session, ...pageProps },
    } = props;

    const SelectedLayout = useGetLayout(Component, Layout);
    const queryClient = new QueryClient();

    return (
        <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Head>
                        <meta
                            content="width=device-width, initial-scale=1.0"
                            name="viewport"
                        />
                        <meta charSet="UTF-8" />
                        <meta content="Get all the events" name="description" />
                        <meta content="Narek Danielyan" name="author" />
                        <title>This is the main page</title>
                    </Head>
                    <SnackbarProvider>
                        <ErrorBoundary
                            FallbackComponent={Fallback}
                            onError={logError}
                        >
                            <SessionProvider
                                {...AUTH_SESSION_OPTIONS}
                                session={session}
                            >
                                <QueryClientProvider
                                    client={queryClient}
                                    initialIsOpen={false}
                                >
                                    <SelectedLayout>
                                        <IsProtected
                                            component={Component}
                                            pageProps={pageProps}
                                        />
                                    </SelectedLayout>
                                    <ReactQueryDevtools initialIsOpen={false} />
                                </QueryClientProvider>
                            </SessionProvider>
                        </ErrorBoundary>
                    </SnackbarProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default MyApp;

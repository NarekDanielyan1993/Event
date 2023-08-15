'use client';

import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'components/Layout';
import { AuthRoute } from 'components/auth-route';
import { Fallback } from 'components/error/error-boundary-fallback';
import { AUTH_SESSION_OPTIONS, QUERY_DEFAULT_PARAMS } from 'constant';
import useGetLayout from 'hooks/useGetLayout';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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

    const [queryClient] = useState(() => new QueryClient(QUERY_DEFAULT_PARAMS));

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
                                    <Hydrate state={pageProps.dehydratedState}>
                                        {Component.auth ? (
                                            <AuthRoute>
                                                <SelectedLayout>
                                                    <Component {...pageProps} />
                                                </SelectedLayout>
                                            </AuthRoute>
                                        ) : (
                                            <SelectedLayout>
                                                <Component {...pageProps} />
                                            </SelectedLayout>
                                        )}
                                    </Hydrate>
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

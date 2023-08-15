import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { Fallback } from 'components/error/error-boundary-fallback';
import { ErrorBoundary } from 'react-error-boundary';
import theme from 'styles/theme';
import { logError } from 'utils';

const MockProviders = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
                {children}
            </ErrorBoundary>
        </ThemeProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: MockProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };

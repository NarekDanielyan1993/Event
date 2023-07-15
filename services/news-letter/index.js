import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { METHODS } from 'constant/api';
import { NEWS_LETTER_PATHS } from 'constant/paths';
import { apiRequest } from 'utils';

const useRegisterMailForNews = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const { enqueueSnackbar } = useSnackbar();

    const registerMailForNews = async (data) => {
        try {
            setIsLoading(true);
            await apiRequest(
                METHODS.POST,
                `${NEWS_LETTER_PATHS.NEWS_LETTER}`,
                data
            );
            enqueueSnackbar('You successfully registered.', {
                variant: 'success',
            });
        } catch (err) {
            showBoundary(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, registerMailForNews };
};

export const useUnsubcribeFromEmail = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const { enqueueSnackbar } = useSnackbar();

    const unsubcribeFromEmail = async (data) => {
        try {
            setIsLoading(true);
            await apiRequest(
                METHODS.DELETE,
                `/${NEWS_LETTER_PATHS.UNSUBSCRIBE}`,
                data
            );
            enqueueSnackbar(
                'You have been successfully unsubscribed from our notifications.',
                {
                    variant: 'success',
                }
            );
        } catch (err) {
            showBoundary(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, unsubcribeFromEmail };
};

export default useRegisterMailForNews;

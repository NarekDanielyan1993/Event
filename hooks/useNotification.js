import { useSnackbar } from 'notistack';

const useNotification = () => {
    const { enqueueSnackbar } = useSnackbar();

    const successSnackbar = (text) =>
        enqueueSnackbar(text, { variant: 'success' });
    const failedSnackbar = (text) =>
        enqueueSnackbar(text, { variant: 'error' });
    const infoSnackbar = (text) => enqueueSnackbar(text, { variant: 'info' });
    const warningSnackbar = (text) =>
        enqueueSnackbar(text, { variant: 'warning' });

    return {
        successSnackbar,
        warningSnackbar,
        infoSnackbar,
        failedSnackbar,
    };
};

export default useNotification;

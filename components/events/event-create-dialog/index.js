import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material';
import { useMemo } from 'react';

import useForm from 'hooks/useForm';

import Loader from 'components/loader';
import useDidUpdate from 'hooks/useDidUpdate';
import { useCreateEvent, useUpdateEvent } from 'services/event';
import validationSchema from './validationSchema';

function EventDialogCreate({ isOpen, onClose, propData }) {
    const defaultValues = useMemo(() => {
        if (propData) {
            const { title, location, date, description } = propData;

            return {
                title: title || '',
                description: description || '',
                location: location || '',
                date: new Date(date),
                file: '',
            };
        }

        return {
            title: '',
            description: '',
            location: '',
            date: new Date(),
            file: '',
        };
    }, [propData]);

    const {
        isLoading: isCreateLoading,
        isSuccess: isCreateSuccess,
        isError: isCreateError,
        createEvent,
    } = useCreateEvent();

    const {
        isLoading: isUpdateLoading,
        isSuccess: isUpdateSuccess,
        updateEvent,
        isError: isUpdateError,
    } = useUpdateEvent();

    useDidUpdate(() => {
        if (!isCreateLoading && !isCreateError && isCreateSuccess) {
            handleClose();
        }
        if (!isUpdateLoading && !isUpdateError && isUpdateSuccess) {
            handleClose();
        }
    }, [isCreateLoading, isUpdateLoading]);

    const { FormField, handleSubmit, formState } = useForm({
        defaultValues,
        validationSchema,
    });

    const handleClose = () => {
        onClose();
    };

    const formSubmitHandler = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('date', data.date);
        formData.append('file', data.file);
        if (propData) {
            await updateEvent(propData._id, formData);
        } else {
            await createEvent(formData);
        }
        handleClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={() => formState.isSubmitSuccessful}
            open={isOpen}
        >
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                {(isUpdateLoading || isCreateLoading) && (
                    <Loader fixed={false} withOverlay={false} />
                )}
                <DialogTitle>{propData ? 'Edit' : 'Create'} Event</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                        <Grid item xs={6}>
                            {FormField({
                                name: 'title',
                                label: 'Title',
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            {FormField({
                                name: 'location',
                                label: 'Location',
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            {FormField({
                                name: 'date',
                                type: 'custom-date',
                                label: 'Event Date',
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            {FormField({
                                name: 'file',
                                label: 'Upload File',
                                type: 'file',
                            })}
                        </Grid>
                        <Grid item xs={12}>
                            {FormField({
                                name: 'description',
                                label: 'Description',
                                type: 'textarea',
                            })}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EventDialogCreate;

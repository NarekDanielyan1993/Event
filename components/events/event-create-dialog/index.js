import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material';
import { format } from 'date-fns';
import { useMemo } from 'react';

import { MM_DD_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

function EventDialogCreate({ isOpen, onSubmit, onClose, propData }) {
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

    const { FormField, handleSubmit } = useForm({
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
        formData.append('date', format(data.date, MM_DD_YYYY));
        formData.append('image', data.file);
        if (propData) {
            await onSubmit(propData._id, formData);
        } else {
            await onSubmit(formData);
        }
        handleClose();
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={isOpen}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
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

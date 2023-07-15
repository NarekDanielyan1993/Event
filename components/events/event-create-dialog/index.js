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

import validationSchema from './validationSchema';

function EventDialogCreate({ isOpen, onCreate, onEdit, onClose, propData }) {
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
        if (propData) {
            await onEdit(propData._id, data);
        } else {
            await onCreate(data);
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

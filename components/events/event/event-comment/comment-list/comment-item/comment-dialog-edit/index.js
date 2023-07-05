import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant/errors';
import useForm from 'hooks/useForm';

const validationSchema = Joi.object({
    text: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
});

function CommentDialogEdit({
    onClose,
    commentId,
    eventId,
    isOpen,
    onSubmit,
    defaultValues,
}) {
    const { FormField, handleSubmit } = useForm({
        defaultValues: defaultValues || { text: '' },
        validationSchema,
    });

    const handleClose = () => {
        onClose();
    };

    const formSubmitHandler = (data) => {
        onSubmit(eventId, commentId, data, onClose);
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={isOpen}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <DialogTitle>Edit comment</DialogTitle>
                <DialogContent>
                    {FormField({
                        name: 'text',
                        label: 'Text',
                    })}
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

export default CommentDialogEdit;

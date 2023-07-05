import useForm from 'hooks/useForm';

import { Box } from '@mui/material';
import SubmitButton from 'components/button/submit-button';
import StyledForm from './style';
import validationSchema from './validationSchema';

function EventCommentForm({ onSubmit }) {
    const { handleSubmit, FormField } = useForm({
        validationSchema,
        defaultValues: {
            name: '',
            text: '',
            email: '',
        },
    });

    const formSubmitHandler = (data) => {
        onSubmit({ name: data.name, email: data.email, text: data.text });
    };

    return (
        <StyledForm onSubmit={handleSubmit(formSubmitHandler)}>
            <Box display={'flex'} gap={'10px'}>
                {FormField({
                    name: 'name',
                    label: 'Name',
                })}
                {FormField({
                    name: 'email',
                    label: 'Email',
                })}
            </Box>
            {FormField({
                name: 'text',
                type: 'textarea',
                label: 'Text',
            })}
            <SubmitButton fullWidth type="submit">
                Submit
            </SubmitButton>
        </StyledForm>
    );
}

export default EventCommentForm;

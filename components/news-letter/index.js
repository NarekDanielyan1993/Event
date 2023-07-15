import useForm from 'hooks/useForm';

import { Box } from '@mui/material';
import SubmitButton from 'components/button/submit-button';
import {
    StyledNewsLetterContainer,
    StyledNewsLetterForm,
    StyledNewsLetterTitle,
} from './style';
import { validationSchema } from './validationSchema';

function NewsLetter({ formSubmitHandler }) {
    const { handleSubmit, FormField, reset } = useForm({
        validationSchema: validationSchema,
        defaultValues: {
            email: '',
        },
    });

    const onFormSubmit = async (data) => {
        await formSubmitHandler(data);
        reset();
    };

    return (
        <StyledNewsLetterContainer>
            <StyledNewsLetterTitle>
                Sign up to stay updated
            </StyledNewsLetterTitle>
            <StyledNewsLetterForm onSubmit={handleSubmit(onFormSubmit)}>
                <Box sx={{ flexGrow: 3 }}>
                    {FormField({
                        name: 'email',
                        label: 'Type Email',
                    })}
                </Box>
                <SubmitButton sx={{ flexGrow: 2 }} type="submit">
                    Register
                </SubmitButton>
            </StyledNewsLetterForm>
        </StyledNewsLetterContainer>
    );
}

export default NewsLetter;

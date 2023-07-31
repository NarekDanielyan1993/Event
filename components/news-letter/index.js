import useForm from 'hooks/useForm';

import Button from 'components/button';
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
                {FormField({
                    name: 'email',
                    label: 'Type Email',
                })}
                <Button className="submit" type="submit">
                    Register
                </Button>
            </StyledNewsLetterForm>
        </StyledNewsLetterContainer>
    );
}

export default NewsLetter;

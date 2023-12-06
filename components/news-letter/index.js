import useForm from 'hooks/useForm';

import Button from 'components/button';
import Loader from 'components/loader';
import { useErrorBoundary } from 'react-error-boundary';
import {
    StyledNewsLetterContainer,
    StyledNewsLetterForm,
    StyledNewsLetterTitle,
} from './style';
import { validationSchema } from './validationSchema';

function NewsLetter({ formSubmitHandler, isLoading }) {
    const { showBoundary } = useErrorBoundary();
    const { handleSubmit, FormField, reset } = useForm({
        validationSchema: validationSchema,
        defaultValues: {
            email: '',
        },
    });

    const onFormSubmit = async (data) => {
        try {
            await formSubmitHandler(data);
            reset();
        } catch (error) {
            showBoundary(error);
        }
    };

    return (
        <StyledNewsLetterContainer>
            {isLoading && <Loader />}
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

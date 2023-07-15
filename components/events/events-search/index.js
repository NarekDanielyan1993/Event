import { MM_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

import SubmitButton from 'components/button/submit-button';
import { isValidDateObject } from 'utils';
import { FormContainer, StyledButton } from './style';

function EventsSearch({ onSearch, onClearFilter }) {
    const onFilterEventsHandler = (data) => {
        onSearch(data.date);
    };

    const { handleSubmit, FormField, watch, setValue } = useForm({
        validationSchema,
        defaultValues: {
            date: {},
        },
    });

    const date = watch('date');

    const clearFilter = () => {
        onClearFilter();
        setValue('date', {});
    };

    return (
        <FormContainer onSubmit={handleSubmit(onFilterEventsHandler)}>
            {FormField({
                type: 'custom-date',
                name: 'date',
                label: 'Event date',
                views: ['year', 'month'],
                format: MM_YYYY,
            })}
            <SubmitButton
                disabled={isValidDateObject(date)}
                sx={{ flexGrow: 1, minWidth: '150px' }}
                type="submit"
            >
                Find Events
            </SubmitButton>
            <StyledButton
                disabled={isValidDateObject(date)}
                onClick={clearFilter}
                variant="contained"
            >
                Clear filters
            </StyledButton>
        </FormContainer>
    );
}

export default EventsSearch;

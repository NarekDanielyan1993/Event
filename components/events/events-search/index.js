import { MM_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

import SubmitButton from 'components/button/submit-button';
import Loader from 'components/loader';
import { useErrorBoundary } from 'react-error-boundary';
import { useFilterEvents } from 'services/event';
import { isValidDateObject } from 'utils';
import { FormContainer, StyledButton } from './style';

function EventsSearch({ setEvents, onClearFilter }) {
    const { showBoundary } = useErrorBoundary();

    const { handleSubmit, FormField, watch, setValue } = useForm({
        validationSchema,
        defaultValues: {
            date: {},
        },
    });

    const date = watch('date');

    const { isLoading: isFilterDatesLoading, getFilteredEvents } =
        useFilterEvents(date);

    const onFilterEventsHandler = async () => {
        try {
            const filteredFilters = await getFilteredEvents();
            setEvents(filteredFilters);
        } catch (error) {
            showBoundary(error);
        }
    };

    const clearFilter = () => {
        onClearFilter();
        setValue('date', {});
    };

    return (
        <FormContainer onSubmit={handleSubmit(onFilterEventsHandler)}>
            {isFilterDatesLoading && <Loader />}
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

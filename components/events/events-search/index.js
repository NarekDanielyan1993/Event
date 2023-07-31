import { MM_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

import Button from 'components/button';
import Loader from 'components/loader';
import useDidUpdate from 'hooks/useDidUpdate';
import { useErrorBoundary } from 'react-error-boundary';
import { useFilterEvents } from 'services/event';
import { isValidDateObject } from 'utils';
import { FormContainer } from './style';

function EventsSearch({ setEvents, onClearFilter, category }) {
    const { showBoundary } = useErrorBoundary();

    const { handleSubmit, FormField, watch, setValue } = useForm({
        validationSchema,
        defaultValues: {
            date: {},
        },
    });

    const date = watch('date');

    const { isLoading: isFilterDatesLoading, getFilteredEvents } =
        useFilterEvents(date, category);

    const onFilterEventsHandler = async () => {
        try {
            const filteredFilters = await getFilteredEvents();
            setEvents((prev) =>
                prev.map((item) =>
                    item.id === category
                        ? { ...item, data: filteredFilters }
                        : item
                )
            );
        } catch (error) {
            showBoundary(error);
        }
    };

    useDidUpdate(() => {
        setValue('date', {});
    }, [category]);

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
            <Button
                className="submit"
                disabled={isValidDateObject(date)}
                type="submit"
            >
                Find Events
            </Button>
            <Button
                className="clear"
                disabled={isValidDateObject(date)}
                onClick={clearFilter}
            >
                Clear
            </Button>
        </FormContainer>
    );
}

export default EventsSearch;

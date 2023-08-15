import { MM_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

import Button from 'components/button';
import useDidUpdate from 'hooks/useDidUpdate';
import { isValidDateObject } from 'utils';
import { FormContainer } from './style';

function EventsSearch({ category, setFilterData }) {
    const { handleSubmit, FormField, watch, setValue } = useForm({
        validationSchema,
        defaultValues: {
            date: {},
        },
    });

    const date = watch('date');

    const onFilterEventsHandler = async ({ date }) => {
        setFilterData(date);
    };

    useDidUpdate(() => {
        setValue('date', {});
    }, [category]);

    const clearFilter = () => {
        setValue('date', {});
        setFilterData('');
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

import { MM_YYYY } from 'constant';
import useForm from 'hooks/useForm';

import validationSchema from './validationSchema';

import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import SubmitButton from 'components/button/submit-button';
import { FormContainer } from './style';

function EventsSearch({ onSearch, onClearFilter }) {
    const onFilterEventsHandler = (data) => {
        onSearch(data.date);
    };

    const theme = useTheme();

    const { handleSubmit, FormField, setValue } = useForm({
        validationSchema,
        defaultValues: {
            date: null,
        },
    });

    const clearFilter = () => {
        onClearFilter();
        setValue('date', null);
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
            <SubmitButton type="submit">Find Events</SubmitButton>
            <Button
                onClick={clearFilter}
                sx={{
                    width: '200px',
                    backgroundColor: theme.palette.background.secondary,
                }}
                variant="contained"
            >
                Clear filters
            </Button>
        </FormContainer>
    );
}

export default EventsSearch;

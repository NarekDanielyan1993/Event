/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { EVENTS_PATHS, METHODS } from 'constant';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from 'utils';

const GET_FILTERED_EVENTS = 'GET_FILTERED_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';

const useCreateEvent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const createEvent = async (data) => {
        try {
            setIsLoading(true);

            const { data: responseData } = await apiRequest({
                method: METHODS.POST,
                url: `${EVENTS_PATHS.EVENTS}`,
                body: data,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            });
            return responseData.createdEvent;
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, createEvent };
};

const useFilterEvents = (date) => {
    const { isLoading, refetch } = useQuery(
        [GET_FILTERED_EVENTS, { date }],
        async ({ queryKey: [, { date }] }) => {
            const date_to_string = date.toISOString();
            const { data: responseData } = await apiRequest({
                method: METHODS.GET,
                url: `${EVENTS_PATHS.DATE_FILTER}/${date_to_string}`,
            });
            return responseData.filteredEvents;
        },
        {
            enabled: false,
        }
    );

    const getFilteredEvents = async () => {
        try {
            const { data: responseData } = await refetch();
            return responseData;
        } catch (error) {
            throw error;
        }
    };

    return {
        isLoading,
        getFilteredEvents,
    };
};

const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    const { isLoading, mutateAsync } = useMutation(
        async ({ eventId, data }) => {
            console.log('data', data);
            const {
                data: { updatedEvent },
            } = await apiRequest({
                method: METHODS.PUT,
                url: `${EVENTS_PATHS.EVENTS}?id=${eventId}`,
                body: data,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            });
            return updatedEvent;
        },
        {
            onSuccess: ({ eventId }) => {
                queryClient.invalidateQueries([GET_EVENTS, eventId]);
            },
        }
    );

    const updateEvent = async (eventId, data) => {
        try {
            const updatedEvent = await mutateAsync({
                eventId,
                data,
            });
            console.log('updatedEvent', updatedEvent);
            return updatedEvent;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, updateEvent };
};

const useDeleteEvent = () => {
    const deleteEventMutation = useMutation((eventId) =>
        apiRequest({
            method: METHODS.DELETE,
            url: `${EVENTS_PATHS.EVENTS}?id=${eventId}`,
        })
    );

    const deleteEvent = async (eventId) => {
        try {
            await deleteEventMutation.mutateAsync(eventId);
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: deleteEventMutation.isLoading, deleteEvent };
};

export { useCreateEvent, useDeleteEvent, useFilterEvents, useUpdateEvent };

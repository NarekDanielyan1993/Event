/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
import { EVENTS_PATHS, METHODS } from 'constant';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiRequest } from 'utils';

const GET_FILTERED_EVENTS = 'GET_FILTERED_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_BY_CATEGORY = 'GET_EVENTS_BY_CATEGORY';

export const useGetEvents = () => {
    const { isLoading, data, refetch } = useQuery(
        GET_EVENTS_BY_CATEGORY,
        async () => {
            const {
                data: { events },
            } = await apiRequest({
                method: METHODS.GET,
                url: EVENTS_PATHS.EVENTS,
            });
            return events;
        },
        {
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    const getEvents = async () => {
        try {
            const { data } = await refetch({
                queryKey: GET_EVENTS_BY_CATEGORY,
                stale: false,
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, data, getEvents };
};

const useCreateEvent = () => {
    const queryClient = useQueryClient();

    const { isLoading, isSuccess, isError, mutateAsync } = useMutation(
        async ({ data }) => {
            const {
                data: { createdEvent },
            } = await apiRequest({
                method: METHODS.POST,
                url: `${EVENTS_PATHS.EVENTS}`,
                body: data,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
            });
            return createdEvent;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(GET_EVENTS_BY_CATEGORY);
            },
        }
    );

    const createEvent = async (data) => {
        try {
            const resData = await mutateAsync({ data });
            return resData;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading, createEvent, isSuccess, isError };
};

const useFilterEvents = (date, typeId) => {
    const { isLoading, refetch } = useQuery(
        [GET_FILTERED_EVENTS, { date, typeId }],
        async ({ queryKey: [, { date, typeId }] }) => {
            const date_to_string = date.toISOString();
            const { data: responseData } = await apiRequest({
                method: METHODS.GET,
                url: `${EVENTS_PATHS.DATE_FILTER}/${date_to_string}?typeId=${typeId}`,
            });
            return responseData.filteredEvents;
        },
        {
            enabled: false,
        }
    );

    const getFilteredEvents = async () => {
        try {
            const { data: responseData } = await refetch({
                queryKey: GET_FILTERED_EVENTS,
            });
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

    const { isLoading, mutateAsync, isSuccess, isError } = useMutation(
        async ({ eventId, data }) => {
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
                queryClient.invalidateQueries([
                    GET_EVENTS_BY_CATEGORY,
                    eventId,
                ]);
            },
        }
    );

    const updateEvent = async (eventId, data) => {
        try {
            const updatedEvent = await mutateAsync({
                eventId,
                data,
            });
            return updatedEvent;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, updateEvent, isSuccess, isError };
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

/* eslint-disable no-useless-catch */
/* eslint-disable consistent-return */
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { EVENTS_PATHS, EVENTS_QUERY_PARAMS, METHODS } from 'constant';
import useObserver from 'hooks/useObserver';
import { apiRequest } from 'utils';

const GET_FILTERED_EVENTS = 'GET_FILTERED_EVENTS';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_BY_CATEGORY = 'GET_EVENTS_BY_CATEGORY';
export const GET_PAGINATED_EVENTS_BY_CATEGORY =
    'GET_PAGINATED_EVENTS_BY_CATEGORY';

export const usePaginatedEvents = (
    type = EVENTS_QUERY_PARAMS.CATEGORY_TYPE.ALL.code,
    filter = '',
    enabled
) => {
    const PAGE_LIMIT = EVENTS_QUERY_PARAMS.PAGE_LIMIT;

    const fetchPaginatedData = async ({
        pageParam,
        type,
        filter,
        filterBy = 'date',
    }) => {
        const offset = pageParam * PAGE_LIMIT;
        const { data } = await apiRequest({
            method: METHODS.GET,
            url: EVENTS_PATHS.EVENTS,
            params: {
                offset: offset,
                limit: PAGE_LIMIT,
                categoryType: type,
                ...(filter && { filter: filter.toISOString() }),
                ...(filterBy && { filterBy: 'date' }),
            },
        });
        return data;
    };

    const {
        status,
        data,
        error,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        fetchNextPage,
    } = useInfiniteQuery(
        [GET_PAGINATED_EVENTS_BY_CATEGORY, type, filter],
        ({ pageParam = 0 }) => fetchPaginatedData({ pageParam, type, filter }),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (
                    Math.ceil(lastPage.totalCount / PAGE_LIMIT) >
                    allPages.length
                ) {
                    return allPages.length;
                }
                return undefined;
            },
            getPreviousPageParam: (firstPage) => firstPage.prevCursor,
            select: (data) => {
                return {
                    labels: data?.pages[0]?.labels || [],
                    data: data?.pages.flatMap((page) => page.data) || [],
                    totalCount: data.pages[0].totalCount || 0,
                };
            },
            staleTime: Infinity,
        }
    );

    const { sentinelRef } = useObserver({
        callback: fetchNextPage,
        isEnabled: hasNextPage,
    });

    return {
        status,
        data: data || {},
        error,
        sentinelRef,
        isFetchingNextPage,
        hasNextPage,
        isLoading: isLoading,
        fetchNextPage,
    };
};

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
    const { isLoading, isSuccess, isError, mutateAsync } = useMutation({
        mutationFn: async ({ data }) => {
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
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [GET_PAGINATED_EVENTS_BY_CATEGORY],
            });
        },
    });

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
                queryKey: [GET_FILTERED_EVENTS],
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

    const { isLoading, mutateAsync, isSuccess, isError } = useMutation({
        mutationFn: async ({ eventId, data }) => {
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
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [GET_PAGINATED_EVENTS_BY_CATEGORY],
            });
        },
    });

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
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync } = useMutation({
        mutationFn: (eventId) =>
            apiRequest({
                method: METHODS.DELETE,
                url: `${EVENTS_PATHS.EVENTS}?id=${eventId}`,
            }),
        onSuccess: () => {
            return queryClient.refetchQueries({
                queryKey: [GET_PAGINATED_EVENTS_BY_CATEGORY],
            });
        },
    });

    const deleteEvent = async (eventId) => {
        try {
            await mutateAsync(eventId);
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, deleteEvent };
};

export { useCreateEvent, useDeleteEvent, useFilterEvents, useUpdateEvent };

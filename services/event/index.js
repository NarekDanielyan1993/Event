/* eslint-disable consistent-return */
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { EVENTS_PATHS, METHODS } from 'constant';
import { apiRequest } from 'utils';

const useCreateEvent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const createEvent = async (data, fn) => {
        try {
            setIsLoading(true);

            const { data: responseData } = await apiRequest(
                METHODS.POST,
                `${EVENTS_PATHS.EVENTS}`,
                data,
                {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            );
            fn(responseData.createdEvent);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, createEvent };
};

const useUpdateEvent = () => {
    const { showBoundary } = useErrorBoundary();

    const [isLoading, setIsLoading] = useState(false);

    const updateEvent = async (eventId, data, fn) => {
        try {
            setIsLoading(true);

            const { data: responseData } = await apiRequest(
                METHODS.PUT,
                `${EVENTS_PATHS.EVENTS}?id=${eventId}`,
                data,
                {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            );
            fn(responseData.updatedEvent);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, updateEvent };
};

const useDeleteEvent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const deleteEvent = async (eventId, fn) => {
        try {
            setIsLoading(true);
            await apiRequest(
                METHODS.DELETE,
                `${EVENTS_PATHS.EVENTS}?id=${eventId}`
            );
            fn();
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, deleteEvent };
};

export { useCreateEvent, useDeleteEvent, useUpdateEvent };

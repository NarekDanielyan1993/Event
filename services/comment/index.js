/* eslint-disable consistent-return */
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { EVENTS_PATHS, METHODS } from 'constant';
import { apiRequest } from 'utils';

export const useGetComments = () => {
    const { showBoundary } = useErrorBoundary();

    const [isLoading, setIsLoading] = useState(false);

    const [isFetched, setIsFetched] = useState(false);

    const getComments = async (eventId) => {
        setIsLoading(true);
        setIsFetched(false);
        try {
            const {
                data: { comments },
            } = await apiRequest(
                METHODS.GET,
                `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`
            );
            return comments;
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
            setIsFetched(true);
        }
    };

    return { isLoading, getComments, isFetched };
};

const useCreateComment = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const createComment = async (eventId, data, fn) => {
        setIsLoading(true);
        try {
            const {
                data: { data: newComment },
            } = await apiRequest(
                METHODS.POST,
                `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`,
                data
            );
            fn(newComment);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, createComment };
};

const useUpdateComment = () => {
    const { showBoundary } = useErrorBoundary();

    const [isLoading, setIsLoading] = useState(false);

    const updateComment = async (eventId, commentId, data, onClose, fn) => {
        setIsLoading(true);
        try {
            const {
                data: { updatedComment },
            } = await apiRequest(
                METHODS.PUT,
                `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}?commentId=${commentId}`,
                data
            );

            fn(updatedComment);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
            if (onClose) {
                onClose();
            }
        }
    };

    return { isLoading, updateComment };
};

const useDeleteComment = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const deleteComment = async (eventId, commentId, fn) => {
        try {
            setIsLoading(true);
            await apiRequest(
                METHODS.DELETE,
                `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`,
                { commentId }
            );
            fn();
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, deleteComment };
};

export { useCreateComment, useDeleteComment, useUpdateComment };

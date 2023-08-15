/* eslint-disable no-useless-catch */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EVENTS_PATHS, METHODS } from 'constant';
import { apiRequest } from 'utils';

export const GET_COMMENTS = 'GET_COMMENTS';

const useGetComments = (eventId) => {
    const { isLoading, refetch } = useQuery(
        {
            queryKey: [GET_COMMENTS, eventId],
            queryFn: async ({ queryKey: [, eventId] }) => {
                const {
                    data: { comments },
                } = await apiRequest({
                    method: METHODS.GET,
                    url: `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`,
                });
                return comments;
            },
        },
        {
            enabled: false,
        }
    );

    const getComments = async () => {
        try {
            const { data } = await refetch();
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading, getComments };
};

const useCreateComment = () => {
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync } = useMutation(
        async ({ eventId, formData }) => {
            const { data: newComment } = await apiRequest({
                method: METHODS.POST,
                url: `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`,
                body: formData,
            });
            return newComment;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(GET_COMMENTS);
            },
        }
    );

    const createComment = async (eventId, formData) => {
        try {
            const { data } = await mutateAsync({ eventId, formData });
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, createComment };
};

const useUpdateComment = () => {
    const { isLoading, mutateAsync } = useMutation(
        async ({ eventId, commentId, data }) => {
            const {
                data: { updatedComment },
            } = await apiRequest({
                method: METHODS.PUT,
                url: `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}?commentId=${commentId}`,
                body: data,
            });
            return updatedComment;
        }
    );

    const updateComment = async (eventId, commentId, data, onClose) => {
        try {
            const updatedComment = await mutateAsync({
                eventId,
                commentId,
                data,
            });
            return updatedComment;
        } catch (error) {
            throw error;
        } finally {
            if (onClose) {
                onClose();
            }
        }
    };

    return { isLoading: isLoading, updateComment };
};

const useDeleteComment = () => {
    const { isLoading, mutateAsync } = useMutation(
        async ({ eventId, commentId }) => {
            await apiRequest({
                method: METHODS.DELETE,
                url: `${EVENTS_PATHS.EVENT_COMMENTS}/${eventId}`,
                body: { commentId },
            });
        }
    );

    const deleteComment = async (eventId, commentId) => {
        try {
            await mutateAsync({ eventId, commentId });
        } catch (error) {
            throw error;
        }
    };

    return { isLoading: isLoading, deleteComment };
};

export { useCreateComment, useDeleteComment, useGetComments, useUpdateComment };

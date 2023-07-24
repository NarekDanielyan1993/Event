import { useRef, useState } from 'react';

import Loader from 'components/loader';
import { useErrorBoundary } from 'react-error-boundary';
import {
    useCreateComment,
    useDeleteComment,
    useGetComments,
    useUpdateComment,
} from 'services/comment';
import EventCommentForm from './comment-form';
import CommentList from './comment-list/index';
import { StyledEventButton, StyledEventCommentContainer } from './style';

function EventComments({ eventId }) {
    const commentListRef = useRef(null);

    const { showBoundary } = useErrorBoundary();

    const [commentList, setCommentList] = useState([]);

    const [showComments, setShowComments] = useState(false);

    const { isLoading: isCreateCommentLoading, createComment } =
        useCreateComment();

    const { isLoading: isCommentsLoading, getComments } =
        useGetComments(eventId);

    const { isLoading: isUpdateCommentLoading, updateComment } =
        useUpdateComment();

    const { isLoading: isDeleteCommentLoading, deleteComment } =
        useDeleteComment();

    const getCommentsHandler = async () => {
        try {
            if (!showComments) {
                const allComments = await getComments();
                setCommentList(allComments);
            }
        } catch (error) {
            showBoundary(error);
        }
        setShowComments((prev) => !prev);
    };

    const onSubmit = async (data) => {
        try {
            const finalData = { ...data };
            const newComment = await createComment(eventId, finalData);
            setCommentList((prev) => [newComment, ...prev]);
        } catch (error) {
            showBoundary(error);
        }
    };

    const deleteComments = async (eventId, commentId) => {
        try {
            await deleteComment(eventId, commentId);
            setCommentList((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );
        } catch (error) {
            showBoundary(error);
        }
    };

    const updateComments = async (eventId, commentId, data, onClose) => {
        try {
            const updatedComment = await updateComment(
                eventId,
                commentId,
                data,
                onClose
            );
            setCommentList((prev) =>
                prev.map((comment) =>
                    comment._id === updatedComment._id
                        ? updatedComment
                        : comment
                )
            );
        } catch (error) {
            showBoundary(error);
        }
    };

    return (
        <StyledEventCommentContainer>
            {(isCreateCommentLoading ||
                isDeleteCommentLoading ||
                isUpdateCommentLoading ||
                isCommentsLoading) && <Loader />}
            <StyledEventButton onClick={getCommentsHandler}>
                {`${showComments ? 'Hide Comments' : 'Show Comments'} `}
            </StyledEventButton>
            <EventCommentForm key={`${commentList}`} onSubmit={onSubmit} />
            {showComments && (
                <CommentList
                    comments={commentList}
                    onDeleteComments={deleteComments}
                    onUpdateComments={updateComments}
                    ref={commentListRef}
                />
            )}
        </StyledEventCommentContainer>
    );
}

export default EventComments;

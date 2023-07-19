import { useRef, useState } from 'react';

import Loader from 'components/loader';
import {
    useCreateComment,
    useDeleteComment,
    useGetComments,
    useUpdateComment,
} from 'services/comment';
import EventCommentForm from './comment-form';
import CommentList from './comment-list/index';
import { StyledEventButton, StyledEventCommentContainer } from './style';

function EventComments() {
    const commentListRef = useRef(null);

    const [commentList, setCommentList] = useState([]);

    const [showComments, setShowComments] = useState(false);

    const { isLoading: isCreateCommentLoading, createComment } =
        useCreateComment();

    const {
        isLoading: isCommentsLoading,
        getComments,
        isFetched: isCommentsFetched,
    } = useGetComments();

    const { isLoading: isUpdateCommentLoading, updateComment } =
        useUpdateComment();

    const { isLoading: isDeleteCommentLoading, deleteComment } =
        useDeleteComment();

    const getCommentsHandler = async () => {
        if (!isCommentsFetched) {
            await getComments(event._id, (allComments) => {
                setCommentList(allComments);
            });
        }
        setShowComments((prev) => !prev);
    };

    const onSubmit = async (data) => {
        const finalData = { ...data };
        await createComment(event._id, finalData, (newComment) => {
            setCommentList((prev) => [newComment, ...prev]);
        });
    };

    const deleteComments = async (eventId, commentId) => {
        await deleteComment(eventId, commentId, () => {
            setCommentList((prev) =>
                prev.filter((comment) => comment._id !== commentId)
            );
        });
    };

    const updateComments = async (eventId, commentId, data, onClose) => {
        await updateComment(
            eventId,
            commentId,
            data,
            onClose,
            (updatedComment) => {
                setCommentList((prev) =>
                    prev.map((comment) =>
                        comment._id === updatedComment._id
                            ? updatedComment
                            : comment
                    )
                );
            }
        );
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
            <EventCommentForm
                key={`${commentList.length}`}
                onSubmit={onSubmit}
            />
            {showComments && (
                <CommentList
                    comments={commentList}
                    isCommentsFetched={isCommentsFetched}
                    onDeleteComments={deleteComments}
                    onUpdateComments={updateComments}
                    ref={commentListRef}
                />
            )}
        </StyledEventCommentContainer>
    );
}

export default EventComments;

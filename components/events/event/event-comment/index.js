import { useRef } from 'react';

import EventCommentForm from './comment-form';
import CommentList from './comment-list/index';
import { StyledEventButton, StyledEventCommentContainer } from './style';

function EventComments({
    onSubmit,
    onDeleteComments,
    comments,
    onUpdateComments,
    onGetComments,
    showComments,
    isCommentsFetched,
}) {
    const commentListRef = useRef(null);

    return (
        <StyledEventCommentContainer>
            <StyledEventButton onClick={onGetComments}>
                {`${showComments ? 'Hide Comments' : 'Show Comments'} `}
            </StyledEventButton>
            <EventCommentForm key={`${comments}`} onSubmit={onSubmit} />
            {showComments && (
                <CommentList
                    comments={comments}
                    isCommentsFetched={isCommentsFetched}
                    onDeleteComments={onDeleteComments}
                    onUpdateComments={onUpdateComments}
                    ref={commentListRef}
                />
            )}
        </StyledEventCommentContainer>
    );
}

export default EventComments;

import { useRef, useState } from 'react';

import EventCommentForm from './comment-form';
import CommentList from './comment-list/index';
import { StyledEventButton, StyledEventCommentContainer } from './style';

function EventComments({
    onSubmit,
    onDeleteComments,
    comments,
    onUpdateComments,
}) {
    const [showComments, setShowComments] = useState(false);

    const commentListRef = useRef(null);

    const toggleCommentsList = () => {
        setShowComments((prev) => !prev);
    };

    return (
        <StyledEventCommentContainer>
            <StyledEventButton
                disabled={!(comments.length > 0)}
                onClick={toggleCommentsList}
            >
                {`${showComments ? 'Hide Comments' : 'Show Comments'} `}
            </StyledEventButton>
            <EventCommentForm key={`${comments}`} onSubmit={onSubmit} />
            {showComments && (
                <CommentList
                    comments={comments}
                    onDeleteComments={onDeleteComments}
                    onUpdateComments={onUpdateComments}
                    ref={commentListRef}
                />
            )}
        </StyledEventCommentContainer>
    );
}

export default EventComments;

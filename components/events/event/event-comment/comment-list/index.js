import { forwardRef, useEffect } from 'react';

import NotFound from 'components/not-found';
import CommentItem from './comment-item';
import StyledList from './style';

const CommentList = forwardRef(
    ({ comments, onUpdateComments, onDeleteComments }, ref) => {
        useEffect(() => {
            if (ref) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, []);

        return (
            <StyledList ref={ref}>
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem
                            comment={comment}
                            key={comment._id}
                            onDeleteComments={onDeleteComments}
                            onUpdateComments={onUpdateComments}
                        />
                    ))
                ) : (
                    <NotFound
                        text="There are no comments to show."
                        withIcon={false}
                    />
                )}
            </StyledList>
        );
    }
);

export default CommentList;

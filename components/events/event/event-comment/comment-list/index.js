import { forwardRef, useEffect } from 'react';

import NotFound from 'components/not-found';
import CommentItem from './comment-item';
import StyledList from './style';

const CommentList = forwardRef(
    ({ comments, onUpdateComments, onDeleteComments }, ref) => {
        useEffect(() => {
            let timeout;
            if (ref.current) {
                timeout = setTimeout(() => {
                    ref.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }, 0);
            }
            return () => clearTimeout(timeout);
        }, [ref?.current]);

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
                        withIcon={true}
                    />
                )}
            </StyledList>
        );
    }
);

export default CommentList;

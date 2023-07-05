import { forwardRef, useEffect } from 'react';

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
                {comments && comments.length > 0
                    ? comments.map((comment) => (
                          <CommentItem
                              comment={comment}
                              key={comment._id}
                              onDeleteComments={onDeleteComments}
                              onUpdateComments={onUpdateComments}
                          />
                      ))
                    : null}
            </StyledList>
        );
    }
);

export default CommentList;

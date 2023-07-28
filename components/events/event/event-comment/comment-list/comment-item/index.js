import { Box, Button, Typography } from '@mui/material';
import IconButton from 'components/button/icon-button';
import { useTruncateText } from 'hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CustomDate } from 'utils';
import CommentDialogEdit from './comment-dialog-edit';
import { StyledCommentWrapper } from './style';

function CommentItem({ comment, onDeleteComments, onUpdateComments }) {
    const {
        query: { eventId },
    } = useRouter();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { truncatedText, handleExpand, isExpanded, shouldTruncate } =
        useTruncateText(comment.text, 120);

    return (
        <StyledCommentWrapper>
            <Box
                alignItems="center"
                display="flex"
                gap="10px"
                justifyContent="space-between"
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                >
                    <Typography component="h3" variant="h3">
                        {comment.name}
                    </Typography>
                </Box>
                <Typography
                    component="span"
                    marginRight="auto"
                    sx={{ fontSize: '11px' }}
                    variant="subtitle2"
                >
                    <b>Posted:</b> {CustomDate.timeElapsed(comment.createdDate)}
                    <span>{' ago'}</span>
                </Typography>
                <Box>
                    <IconButton
                        name="edit"
                        onClick={() => setIsDialogOpen(true)}
                    />
                    <IconButton
                        name="delete"
                        onClick={() => onDeleteComments(eventId, comment._id)}
                    />
                </Box>
            </Box>
            <Box>
                <Typography component="span">{truncatedText}</Typography>
                {shouldTruncate && (
                    <Button
                        onClick={handleExpand}
                        sx={{
                            display: 'block',
                            fontSize: '10px',
                            padding: '5px',
                        }}
                        variant="contained"
                    >
                        {isExpanded ? 'show less' : 'show more'}
                    </Button>
                )}
            </Box>
            <CommentDialogEdit
                commentId={comment._id}
                defaultValues={{ text: comment.text }}
                eventId={eventId}
                isOpen={isDialogOpen}
                key={comment.text}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={onUpdateComments}
            />
        </StyledCommentWrapper>
    );
}

export default CommentItem;

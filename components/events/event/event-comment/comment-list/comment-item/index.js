import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useTruncateText } from 'hooks';
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
                    <IconButton onClick={() => setIsDialogOpen(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => onDeleteComments(eventId, comment._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
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

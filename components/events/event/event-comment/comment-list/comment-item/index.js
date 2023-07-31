import { Box, Typography } from '@mui/material';
import Button from 'components/button';
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
                    sx={{
                        display: 'block',
                        width: (theme) => theme.spacing(30),
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <Typography noWrap>{comment.name}</Typography>
                    <Typography
                        component="span"
                        marginRight="auto"
                        sx={{ fontSize: '11px' }}
                        variant="body1"
                    >
                        <b>Posted:</b>{' '}
                        {CustomDate.timeElapsed(comment.createdDate)}
                        <span>{' ago'}</span>
                    </Typography>
                </Box>
                <Box display="flex">
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
            <Box sx={{ wordBreak: 'break-word' }}>
                <Typography component="span">{truncatedText}</Typography>
                {shouldTruncate && (
                    <Button
                        className="textToggle"
                        onClick={handleExpand}
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

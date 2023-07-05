import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { dbMiddleware } from 'lib/middlewares';
import { handleError, validateRequest } from 'utils';

import { authMiddleware } from 'lib/middlewares/auth';
import Comment from './comment.model';
import {
    addCommentValidationSchema,
    deleteCommentValidationSchema,
    editCommentValidationSchema,
} from './comment.validation';

const router = createRouter();

router.use(dbMiddleware);

router.use(authMiddleware);

router.get(async (req, res) => {
    try {
        const { eventId } = req.query;
        const allComments = await Comment.find({ eventId });
        res.status(200).json({ comments: allComments });
    } catch (error) {
        handleError(error, res);
    }
});

router.post(validateRequest(addCommentValidationSchema), async (req, res) => {
    try {
        const { body } = req;
        const comment = new Comment({
            ...body,
            eventId: req.query.eventId,
        });

        const savedComment = await comment.save();

        res.status(201).json({ data: savedComment });
    } catch (error) {
        handleError(error, res);
    }
});

router.put(validateRequest(editCommentValidationSchema), async (req, res) => {
    try {
        const { commentId } = req.query;

        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: commentId },
            { ...req.body },
            { new: true }
        );

        res.status(201).json({ msg: 'success', updatedComment });
    } catch (error) {
        handleError(error, res);
    }
});

router.delete(
    validateRequest(deleteCommentValidationSchema),
    async (req, res) => {
        try {
            const { commentId } = req.body;

            await Comment.findOneAndDelete({ _id: commentId });
            res.status(201).json({ msg: 'success' });
        } catch (error) {
            handleError(error, res);
        }
    }
);

export default router.handler({
    onError: (err, req, res) => {
        handleError(err, res);
    },
    onNoMatch: (req, res) => {
        res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
            msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
        });
    },
});

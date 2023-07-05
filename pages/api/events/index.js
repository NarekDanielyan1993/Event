import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { deleteImageFromStorage, fileUploadHandler } from 'lib';
import { dbMiddleware } from 'lib/middlewares';

import {
    ForbiddenError,
    handleError,
    InternalServerError,
    validateRequest,
} from 'utils';

import Comment from '../comments/comment.model';
import Subscriber from '../news-letter/news-letter.model';

import { authMiddleware } from 'lib/middlewares/auth';
import Event from './event.model';
import {
    createEventValidationSchema,
    updateEventValidationSchema,
} from './event.validation';

const router = createRouter();

router.use(dbMiddleware);

export const config = {
    api: {
        bodyParser: false,
    },
};

router.use(fileUploadHandler);

router.get(authMiddleware, async (req, res) => {
    try {
        const allEvents = await Event.getAllEvents();

        res.status(200).json({ msg: 'success', events: allEvents });
    } catch (error) {
        handleError(error, res);
    }
});

router.post(
    authMiddleware,
    validateRequest(createEventValidationSchema),
    async (req, res) => {
        try {
            const { id } = req.file;

            if (!id) {
                throw new InternalServerError();
            }

            const newEvent = { ...req.body, imageId: id };

            const createdEvent = await Event.createEvent(newEvent);

            await Subscriber.sendNotification(createdEvent);

            res.status(200).json({ msg: 'success', createdEvent });
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.put(validateRequest(updateEventValidationSchema), async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new ForbiddenError();
        }
        const fileId = req.file.id;

        if (!fileId) {
            throw new InternalServerError();
        }

        const currentEvent = await Event.getEventById(id);

        const dataToUpdate = { ...req.body, imageId: fileId };

        const updatedEvent = await Event.updateEvent(id, dataToUpdate, {
            upsert: true,
        });

        await deleteImageFromStorage(currentEvent.imageId);

        res.status(200).json({ msg: 'success', updatedEvent });
    } catch (error) {
        handleError(error, res);
    }
});

router.delete(authMiddleware, async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new InternalServerError();
        }

        const deletedEvent = await Event.deleteEventById(id);

        await Comment.deleteCommentsByEvent(deletedEvent._id);

        await deleteImageFromStorage(deletedEvent.imageId);

        res.status(200).json({ msg: 'success' });
    } catch (error) {
        handleError(error, res);
    }
});

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

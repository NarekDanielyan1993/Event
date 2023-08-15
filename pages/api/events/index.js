import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES, FILE_ERROR_TYPES } from 'constant';
import { fileUploadMiddleware } from 'lib';
import { dbMiddleware } from 'lib/middlewares';

import {
    FileError,
    handleError,
    InternalServerError,
    validateRequest,
} from 'utils';

import Comment from '../comments/comment.model';
import Subscriber from '../news-letter/news-letter.model';

import AWSService from 'lib/aws-service';
import { authMiddleware } from 'lib/middlewares/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
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

router.get(async (req, res) => {
    try {
        const {
            user: { userId },
        } = await getServerSession(req, res, authOptions);
        const { categoryType, limit, offset, filter, filterBy } = req.query;
        console.log('categoryType', categoryType);
        const allEvents = await Event.getPaginatedEventsByCategory({
            categoryType,
            userId,
            offset,
            limit,
            filter,
            filterBy,
        });
        console.log('allEvents', allEvents);

        res.status(200).json(allEvents);
    } catch (error) {
        handleError(error, res);
    }
});

router.post(
    authMiddleware,
    fileUploadMiddleware,
    validateRequest(createEventValidationSchema),
    async (req, res) => {
        try {
            const { file } = req;

            if (!file) {
                throw new FileError(
                    FILE_ERROR_TYPES.NO_FILE_FOUND.msg,
                    FILE_ERROR_TYPES.NO_FILE_FOUND.status
                );
            }

            const {
                user: { userId },
            } = await getServerSession(req, res, authOptions);
            const newEvent = {
                ...req.body,
                userId,
                imageId: file.newFilename,
            };

            const createdEvent = await Event.createEvent(newEvent);

            await Subscriber.sendNotification(createdEvent);

            res.status(200).json({ msg: 'success', createdEvent });
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.put(
    authMiddleware,
    fileUploadMiddleware,
    validateRequest(updateEventValidationSchema),
    async (req, res) => {
        try {
            const { id } = req.query;

            if (!id) {
                throw new InternalServerError();
            }

            const { file } = req;

            if (!file) {
                throw new FileError(
                    FILE_ERROR_TYPES.NO_FILE_FOUND.msg,
                    FILE_ERROR_TYPES.NO_FILE_FOUND.status
                );
            }

            const currentEvent = await Event.getEventById(id);

            const dataToUpdate = { ...req.body, imageId: file.newFilename };

            const updatedEvent = await Event.updateEvent(id, dataToUpdate, {
                upsert: true,
            });

            const awsService = new AWSService();
            await awsService.deleteFile(currentEvent.imageId);

            res.status(200).json({ msg: 'success', updatedEvent });
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.delete(authMiddleware, async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new InternalServerError();
        }

        const deletedEvent = await Event.deleteEventById(id);

        await Comment.deleteCommentsByEvent(deletedEvent._id);

        const awsService = new AWSService();
        await awsService.deleteFile(deletedEvent.imageId);

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

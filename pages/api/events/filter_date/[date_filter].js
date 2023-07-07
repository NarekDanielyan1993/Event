import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { dbMiddleware } from 'lib/middlewares';
import { handleError } from 'utils';

import { authMiddleware } from 'lib/middlewares/auth';
import Event from '../event.model';

const router = createRouter();

router.use(dbMiddleware);

router.use(authMiddleware);

router.get(async (req, res) => {
    try {
        const { date_filter } = req.query;
        const filteredEvents = await Event.getEventsByDate(date_filter);

        res.status(200).json({ filteredEvents });
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

import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { dbMiddleware } from 'lib/middlewares';
import { handleError } from 'utils';

import { authMiddleware } from 'lib/middlewares/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import Event from '../event.model';

const router = createRouter();

router.use(dbMiddleware);

router.use(authMiddleware);

router.get(async (req, res) => {
    try {
        const { date_filter, typeId } = req.query;
        const {
            user: { userId },
        } = await getServerSession(req, res, authOptions);
        const filteredEvents = await Event.getEventsByDate(
            date_filter,
            typeId,
            userId
        );
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

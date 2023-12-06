import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { ForbiddenError, handleError, validateRequest } from 'utils';

import Subscriber from './news-letter.model';
import {
    newsLetterDeleteValidationSchema,
    newsLetterValidationSchema,
} from './news-letter.validation';

const router = createRouter();

router.post(validateRequest(newsLetterValidationSchema), async (req, res) => {
    try {
        const { email } = req.body;

        await Subscriber.storeEmail({ email: email.toLowerCase() });
        res.status(201).json({ msg: 'success' });
    } catch (error) {
        handleError(error, res);
    }
});

router.delete(
    validateRequest(newsLetterDeleteValidationSchema),
    async (req, res) => {
        try {
            const { email } = req.body;
            const subscriberEmail = await Subscriber.getSubscriber(email);
            if (!subscriberEmail) {
                throw new ForbiddenError(
                    'You have already unsubscribed from the notifications.'
                );
            }
            await Subscriber.deleteEmail(email.toLowerCase());
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

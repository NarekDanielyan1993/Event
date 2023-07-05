import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import { dbMiddleware } from 'lib/middlewares';
import { handleError, hashPassword, validateRequest } from 'utils';

import { authValidationSchema } from './auth.validation';
import User from './user.model';

const router = createRouter();

router.use(dbMiddleware);

router.post(validateRequest(authValidationSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const createdUser = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ createdUser });
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

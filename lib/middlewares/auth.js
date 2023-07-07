import { getToken } from 'next-auth/jwt';
import { ForbiddenError, handleError } from 'utils';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = await getToken({ req });
        console.log('token', token);
        if (!token) {
            throw new ForbiddenError('Authentication failed.');
        }
        return await next();
    } catch (error) {
        handleError(error, res);
    }
};

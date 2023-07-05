import { connectDB } from 'lib/db';
import { handleError } from 'utils';

export const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        await next();
    } catch (error) {
        handleError(error, res);
    }
};

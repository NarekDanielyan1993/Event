import mongoose from 'mongoose';

import { COMMON_ERROR_TYPES, MONGODB_URL } from 'constant';
import { HttpError } from 'utils';

let connect = null;

export const connectDB = async () => {
    if (connect) {
        return connect;
    }
    try {
        connect = await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        return connect;
    } catch (error) {
        const newError = new HttpError(
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status
        );

        throw newError;
    }
};

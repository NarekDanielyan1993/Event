import mongoose from 'mongoose';

import { COMMON_ERROR_TYPES } from 'constant';
import { HttpError } from 'utils';

let connect = null;

export const connectDB = async () => {
    delete mongoose.models.Event;
    if (connect) {
        console.log('Successfully connected to db.');
        return connect;
    }
    try {
        connect = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to db.');
        return connect;
    } catch (error) {
        const newError = new HttpError(
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg,
            COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.status
        );

        throw newError;
    }
};

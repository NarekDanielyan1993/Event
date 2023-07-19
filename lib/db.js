import mongoose from 'mongoose';

import { InternalServerError } from 'utils';

let connect = null;

export const connectDB = async () => {
    // delete mongoose.models.Comment;
    // mongoose.deleteModel('Comment');
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
        const newError = new InternalServerError();
        throw newError;
    }
};

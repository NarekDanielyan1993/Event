import mongoose from 'mongoose';

import { IMAGE_BUCKET } from 'constant';

import { connectDB } from './db';

let bucket = null;

export const createGridFSBucket = async () => {
    if (!bucket) {
        const conn = await connectDB();

        bucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName: IMAGE_BUCKET,
        });

        return bucket;
    }

    return bucket;
};

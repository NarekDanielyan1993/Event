import { v4 as uuidV4 } from 'uuid';

import {
    GRID_FS_STORAGE_ERROR,
    IMAGE_BUCKET,
    MONGODB_IMAGE_URL,
} from 'constant';
import { InternalServerError, NotFoundError } from 'utils';

import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createGridFSBucket } from './creatGridFSBucket';

export const createGridFsStorage = () => {
    const storage = new GridFsStorage({
        url: 'mongodb+srv://Narek1:096616917nN@cluster0.zfrse.mongodb.net/events?retryWrites=true&w=majority',
        file: (req, file) => {
            const filename = `${uuidV4()}_${file.originalname}`;
            const imagePath = `${MONGODB_IMAGE_URL}/${IMAGE_BUCKET}/${filename}`;
            const fileInfo = {
                filename,
                bucketName: IMAGE_BUCKET,
                path: imagePath,
            };

            return fileInfo;
        },
    });

    storage.on('error', () => {
        const err = new InternalServerError(
            GRID_FS_STORAGE_ERROR.msg,
            GRID_FS_STORAGE_ERROR.status
        );

        throw err;
    });

    storage.on('connectionFailed', () => {
        const error = new InternalServerError(
            GRID_FS_STORAGE_ERROR.msg,
            GRID_FS_STORAGE_ERROR.status
        );

        throw error;
    });

    return storage;
};

export const pipeImage = async (id, res) => {
    try {
        const bucket = await createGridFSBucket();

        const objectId = new mongoose.Types.ObjectId(id);
        const files = await bucket.find({ _id: objectId }).toArray();

        if (!Array.isArray(files) && files.length > 0) {
            throw new NotFoundError('File not found');
        }

        const file = files[0];

        res.setHeader('Content-Type', file.contentType);
        bucket.openDownloadStream(objectId).pipe(res);
    } catch (error) {
        console.error('Error occurred while fetching image:', error);
        throw error;
    }
};

export const deleteImageFromStorage = async (id) => {
    try {
        const bucket = await createGridFSBucket();

        if (!bucket) {
            throw new InternalServerError(
                'There has been an issue while deleting the image.'
            );
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const existingFile = await bucket.find({ _id: objectId }).toArray();

        if (Array.isArray(existingFile) && existingFile.length > 0) {
            await bucket.delete(objectId);
        }
    } catch (error) {
        console.error('Error occurred while deleting image:', error);
        throw error;
    }
};

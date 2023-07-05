import multer from 'multer';

import { ALLOWED_FILE_TYPES, FILE_ERROR_TYPES, MAX_FILE_SIZE } from 'constant';
import { MulterError, handleError } from 'utils';

import { createGridFsStorage } from './gridFsStorage';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const multerMiddleware = multer({
    limits: {
        fieldCount: Infinity,
        fieldSize: Infinity,
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            const err = new MulterError(FILE_ERROR_TYPES.INVALID_FILE_TYPE.msg);

            cb(err);
        } else {
            cb(null, true);
        }
    },
    storage: createGridFsStorage(),
}).single('image');

export const fileUploadHandler = (req, res, next) => {
    multerMiddleware(req, res, async (err) => {
        if (err) {
            handleError(err, res);
        } else {
            await next();
        }
    });
};

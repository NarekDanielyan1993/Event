import { createRouter } from 'next-connect';

import { COMMON_ERROR_TYPES } from 'constant';
import AWSService from 'lib/aws-service';
import { ForbiddenError, handleError } from 'utils';

const router = createRouter();

router.get(async (req, res) => {
    try {
        const { fileId } = req.query;
        if (!fileId) {
            throw new ForbiddenError('File id not found.');
        }
        const awsService = new AWSService();
        const fileStream = await awsService.getFileStream(fileId, res);
        fileStream.pipe(res);
    } catch (error) {
        handleError(error, res);
    }
});

export const config = {
    api: {
        externalResolver: true,
    },
};

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

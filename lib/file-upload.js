import AWSService from './aws-service';
import FormParser from './form-parser';

export const fileUploadMiddleware = async (req, res, next) => {
    try {
        const formParser = new FormParser();
        const [fields, files] = await formParser.parseForm(req);

        const file = files.file[0];

        const awsService = new AWSService();
        await awsService.uploadFile(file, res);
        req.file = file || null;
        req.body = fields;
        await next();
    } catch (error) {
        console.error('Error accured while uploading file.');
        throw error;
    }
};

import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { handleError } from 'utils';

class AWSService {
    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_KEY,
            },
        });
    }

    async uploadFile(file, res) {
        try {
            console.log(file);
            const buffer = fs.readFileSync(file.filepath);
            const params = {
                Bucket: `${process.env.AWS_BUCKET}`,
                Key: `${process.env.AWS_BUCKET_IMAGES}/${file.newFilename}`,
                Body: buffer,
            };
            const uploadCommand = new PutObjectCommand(params);
            await this.s3Client.send(uploadCommand);
        } catch (err) {
            console.error('Error uploading file:', err);
            handleError(err, res);
        }
    }

    async getFileStream(fileId) {
        const params = {
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: `${process.env.AWS_BUCKET_IMAGES}/${fileId}`,
        };

        try {
            const command = new GetObjectCommand(params);
            const stream = await this.s3Client.send(command);
            return stream.Body;
        } catch (err) {
            console.error('Error getting file stream:', err);
            throw err;
        }
    }

    async deleteFile(fileId) {
        const params = {
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: `${process.env.AWS_BUCKET_IMAGES}/${fileId}`,
        };

        try {
            const deleteCommand = new DeleteObjectCommand(params);
            await this.s3Client.send(deleteCommand);
        } catch (err) {
            console.error('Error deleting file:', err);
            throw err;
        }
    }
}

export default AWSService;

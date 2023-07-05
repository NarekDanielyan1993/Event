export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const { MONGODB_URL } = process.env;

export const MONGODB__DB = process.env.MONGODB_DATABASE_NAME;

export const { MONGODB_IMAGE_URL } = process.env;

export const { IMAGE_BUCKET } = process.env;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const { NODEMAILER_PROVIDER } = process.env;
export const { NODEMAILER_EMAIL } = process.env;
export const { NODEMAILER_PASSWORD } = process.env;

export const { NEXTAUTH_SECRET } = process.env;

export const COLLECTION_NAMES = {
    NEWSLETTER: 'newsLetter',
    COMMENTS: 'comments',
};

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
};

import { compare, hash } from 'bcryptjs';

import {
    AUTH_ENCRYPTION_LENGTH,
    COMMON_ERROR_TYPES,
    IMAGES_PATH,
} from 'constant';

import { handleError, ValidationError } from './error-handler';

export const hashPassword = async (password) => {
    return await hash(password, AUTH_ENCRYPTION_LENGTH);
};

export const verifyPassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
};

export const validateRequest = (schema) => async (req, res, next) => {
    try {
        const { error } = await schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            const errors = error.details.reduce((acc, err) => {
                acc.push(err.message);

                return acc;
            }, []);
            const validationError = new ValidationError(
                COMMON_ERROR_TYPES.VALIDATION_ERROR.msg,
                COMMON_ERROR_TYPES.VALIDATION_ERROR.status,
                COMMON_ERROR_TYPES.VALIDATION_ERROR.name,
                COMMON_ERROR_TYPES.VALIDATION_ERROR.title,
                errors
            );

            throw validationError;
        } else {
            await next();
        }
    } catch (error) {
        handleError(error, res);
    }
};

export function getFilteredEvents(dateFilter, events) {
    const filtered_by_year = dateFilter.getFullYear();
    const filtered_by_month = dateFilter.getMonth() + 1;

    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        const month = eventDate.getMonth() + 1;
        const year = eventDate.getFullYear();

        return year === filtered_by_year && month === filtered_by_month;
    });

    return filteredEvents;
}

export const transformErrorData = (error) => {
    const err = {};

    err.isError = true;
    err.errors = error?.response?.data?.errors || [];
    err.title =
        error?.response?.data?.title ||
        COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.title;
    err.msg =
        error?.response?.data?.msg ||
        error.msg ||
        COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg;
    return err;
};

export const transformToLocalDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

export const loadImage = ({ src }) => `/${IMAGES_PATH}/${src}`;

export const getEmailContent = (
    data,
    location
) => `Hi, I hope you’re having a great day! I’m glad to see you’re interested in our upcoming event.
I wanted to introduce myself and let you know more about us.
My name is Narek, and I would like to let you know about an upcoming event on ${data} taking place at ${location}. 
You can use the following link to learn more about the event.`;

export const getEmailSubject = () => 'Upcaming event';

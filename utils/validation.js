import { DEFAULT_VALIDATION_ERRORS } from 'constant';
import Joi from 'joi';

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
};

export const passwordSchema = Joi.string()
    .pattern(
        new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
    )
    .required()
    .messages({ ...DEFAULT_VALIDATION_ERRORS });

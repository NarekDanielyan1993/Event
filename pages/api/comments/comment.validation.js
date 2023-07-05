import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant/errors';

export const addCommentValidationSchema = Joi.object({
    name: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages(DEFAULT_VALIDATION_ERRORS),
    text: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
});

export const editCommentValidationSchema = Joi.object({
    text: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
});

export const deleteCommentValidationSchema = Joi.object({
    commentId: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
});

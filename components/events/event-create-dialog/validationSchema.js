import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant';

const validationSchema = Joi.object({
    title: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    description: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    location: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    date: Joi.object().messages(DEFAULT_VALIDATION_ERRORS),
    file: Joi.object()
        .required()
        .messages({
            ...DEFAULT_VALIDATION_ERRORS,
            'object.base': 'File is required',
        }),
});

export default validationSchema;

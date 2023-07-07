import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant';

const validationSchema = Joi.object({
    date: Joi.object()
        .required()
        .messages({
            ...DEFAULT_VALIDATION_ERRORS,
            'object.base': 'Is a Required field',
        }),
});

export default validationSchema;

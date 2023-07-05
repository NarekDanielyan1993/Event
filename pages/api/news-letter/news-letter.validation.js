import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from '../../../constant';

export const newsLetterValidationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(DEFAULT_VALIDATION_ERRORS),
});

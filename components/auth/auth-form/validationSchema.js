import { DEFAULT_VALIDATION_ERRORS } from 'constant';
import Joi from 'joi';
import { passwordSchema } from 'utils';

export const validationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(DEFAULT_VALIDATION_ERRORS),
    password: passwordSchema,
});

import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant/errors';
import { passwordSchema } from 'utils';

export const authValidationSchema = Joi.object({
    password: passwordSchema,
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages(DEFAULT_VALIDATION_ERRORS),
});

export const validateAuthData = (data) => {
    const { error } = authValidationSchema.validate(data);
    return !!error;
};

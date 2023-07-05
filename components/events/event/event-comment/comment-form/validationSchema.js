import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from '../../../../../constant';

const validationSchema = Joi.object({
    name: Joi.string().required().max(25).messages(DEFAULT_VALIDATION_ERRORS),
    text: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(DEFAULT_VALIDATION_ERRORS),
});

export default validationSchema;

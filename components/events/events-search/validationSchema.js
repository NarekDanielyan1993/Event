import Joi from 'joi';

import { DEFAULT_VALIDATION_ERRORS } from 'constant';

const validationSchema = Joi.object({
    date: Joi.object().required().messages(DEFAULT_VALIDATION_ERRORS),
});

export default validationSchema;

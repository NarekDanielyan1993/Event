import { DEFAULT_VALIDATION_ERRORS } from 'constant';
import Joi from 'joi';

export const getEventsValidationSchema = Joi.object({});

export const createEventValidationSchema = Joi.object({
    title: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    description: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    location: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    date: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
    image: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
});

export const updateEventValidationSchema = Joi.object({
    title: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    description: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    location: Joi.string().required().messages(DEFAULT_VALIDATION_ERRORS),
    date: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
    image: Joi.string().messages(DEFAULT_VALIDATION_ERRORS),
});

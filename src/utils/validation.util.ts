import * as Joi from 'joi';
import { ValidationError } from './errors.util';

export const validate = (schema: Joi.Schema, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
};

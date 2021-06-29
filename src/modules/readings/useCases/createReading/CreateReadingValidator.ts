import Joi from 'joi';

import defaultValidationOptions from '@shared/infra/joi/defaultValidationOptions';

import { ICreateReadingDTO } from './ICreateReadingDTO';

const createReadingSchema = Joi.object().keys({
  sensor_node_id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  collected_at: Joi.date().iso().required(),
  pm10: Joi.number().min(0).required(),
  pm25: Joi.number().min(0).required(),
  pressure: Joi.number().min(0).allow(null).optional(),
  relative_humidity: Joi.number().min(0).max(100).allow(null).optional(),
  temperature: Joi.number().min(-273.15).allow(null).optional(),
});

export const CreateReadingValidator = (
  data: ICreateReadingDTO
): Joi.ValidationResult =>
  createReadingSchema.validate(data, defaultValidationOptions);

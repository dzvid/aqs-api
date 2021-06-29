import { ICreateSensorNodeDTO } from '@modules/sensorNodes/useCases/createSensorNode/ICreateSensorNodeDTO';
import Joi from 'joi';

import defaultValidationOptions from '@shared/infra/joi/defaultValidationOptions';

const createSensorNodeSchema = Joi.object().keys({
  location_latitude: Joi.number().min(-90).max(90).required(),
  location_longitude: Joi.number().min(-180).max(180).required(),
});

export const CreateSensorNodeValidator = (
  data: ICreateSensorNodeDTO
): Joi.ValidationResult =>
  createSensorNodeSchema.validate(data, defaultValidationOptions);

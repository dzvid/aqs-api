import Joi from 'joi';

import { ValidationError } from '@shared/errors/ValidationError';

export namespace CreateSensorNodeError {
  export class SensorNodeValidationError extends ValidationError {
    constructor(error: Joi.ValidationError) {
      super(error);
    }
  }
}

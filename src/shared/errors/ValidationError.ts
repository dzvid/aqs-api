import Joi from 'joi';

import { AppError } from '@shared/errors/AppError';

export class ValidationError extends AppError {
  constructor(validationErrors: Joi.ValidationError) {
    super(validationErrors.message);
  }
}

/* eslint-disable max-classes-per-file */
import { AppError } from '@shared/errors/AppError';

export namespace CreateReadingError {
  export class ReadingAlreadyExists extends AppError {
    constructor() {
      super('Reading already exists');
    }
  }

  export class SensorNodeNotFound extends AppError {
    constructor() {
      super('Sensor Node not found', 404);
    }
  }

  export class InvalidReading extends AppError {
    constructor() {
      super('Invalid reading data');
    }
  }
}

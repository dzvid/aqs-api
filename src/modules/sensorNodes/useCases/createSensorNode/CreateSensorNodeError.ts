/* eslint-disable max-classes-per-file */
import { AppError } from '@shared/errors/AppError';

export namespace CreateSensorNodeError {
  export class InvalidSensorNodeLocation extends AppError {
    constructor() {
      super('Invalid sensor node location');
    }
  }

  export class InvalidSensorNodeLatitude extends AppError {
    constructor() {
      super('Invalid sensor node latitude');
    }
  }

  export class InvalidSensorNodeLongitude extends AppError {
    constructor() {
      super('Invalid sensor node longitude');
    }
  }
}

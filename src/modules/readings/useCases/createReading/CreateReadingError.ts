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

  export class InvalidPM25Value extends AppError {
    constructor() {
      super('Invalid particulate matter 2.5μm value');
    }
  }

  export class InvalidPM10Value extends AppError {
    constructor() {
      super('Invalid particulate matter 10μm value');
    }
  }

  export class InvalidPressureValue extends AppError {
    constructor() {
      super('Invalid pressure value');
    }
  }

  export class InvalidTemperatureValue extends AppError {
    constructor() {
      super('Invalid temperature value');
    }
  }

  export class InvalidRelativeHumidity extends AppError {
    constructor() {
      super('Invalid relative humidity value');
    }
  }
}

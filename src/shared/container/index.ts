import { ISensorNodeRepository } from '@modules/sensorNodes/repositories/ISensorNodeRepository';
import { SensorNodeRepository } from '@modules/sensorNodes/repositories/SensorNodeRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISensorNodeRepository>(
  'SensorNodeRepository',
  SensorNodeRepository
);

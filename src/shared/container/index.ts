import { ISensorNodesRepository } from '@modules/sensorNodes/repositories/ISensorNodesRepository';
import { SensorNodesRepository } from '@modules/sensorNodes/repositories/SensorNodesRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISensorNodesRepository>(
  'SensorNodesRepository',
  SensorNodesRepository
);

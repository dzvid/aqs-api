import { IReadingsRepository } from '@modules/readings/repositories/IReadingsRepository';
import { ReadingsRepository } from '@modules/readings/repositories/ReadingsRepository';
import { ISensorNodesRepository } from '@modules/sensorNodes/repositories/ISensorNodesRepository';
import { SensorNodesRepository } from '@modules/sensorNodes/repositories/SensorNodesRepository';
import { container } from 'tsyringe';

container.registerSingleton<ISensorNodesRepository>(
  'SensorNodesRepository',
  SensorNodesRepository
);

container.registerSingleton<IReadingsRepository>(
  'ReadingsRepository',
  ReadingsRepository
);

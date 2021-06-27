import { Reading } from '@modules/readings/entities/Reading';
import { IReadingsRepository } from '@modules/readings/repositories/IReadingsRepository';
import { ISensorNodesRepository } from '@modules/sensorNodes/repositories/ISensorNodesRepository';
import { inject, injectable } from 'tsyringe';

import { CreateReadingError } from './CreateReadingError';
import { ICreateReadingDTO } from './ICreateReadingDTO';

@injectable()
export class CreateReadingUseCase {
  constructor(
    @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository,
    @inject('SensorNodesRepository')
    private sensorNodesRepository: ISensorNodesRepository
  ) {}

  async execute({
    sensor_node_id,
    collected_at,
    pm10,
    pm25,
    pressure,
    relative_humidity,
    temperature,
  }: ICreateReadingDTO): Promise<Reading> {
    const sensorNodeExists = await this.sensorNodesRepository.findById(
      sensor_node_id
    );

    if (!sensorNodeExists) {
      throw new CreateReadingError.SensorNodeNotFound();
    }

    const readingAlreadyExists =
      await this.readingsRepository.findReadingBySensorNodeIdAndCollectedAtDate(
        sensor_node_id,
        collected_at
      );

    if (readingAlreadyExists) {
      throw new CreateReadingError.ReadingAlreadyExists();
    }

    if (pm10 < 0) {
      throw new CreateReadingError.InvalidPM10Value();
    }

    if (pm25 < 0) {
      throw new CreateReadingError.InvalidPM25Value();
    }

    const reading = await this.readingsRepository.create({
      sensor_node_id,
      collected_at,
      pm10,
      pm25,
      pressure,
      relative_humidity,
      temperature,
    });

    return reading;
  }
}

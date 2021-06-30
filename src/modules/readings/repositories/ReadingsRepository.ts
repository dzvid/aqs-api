import { getRepository, Repository } from 'typeorm';

import { Reading } from '../entities/Reading';
import { ICreateReadingDTO } from '../useCases/createReading/ICreateReadingDTO';
import { IReadingsRepository } from './IReadingsRepository';

export class ReadingsRepository implements IReadingsRepository {
  private repository: Repository<Reading>;

  constructor() {
    this.repository = getRepository(Reading);
  }

  async create({
    sensor_node_id,
    collected_at,
    pm10,
    pm25,
    pressure,
    relative_humidity,
    temperature,
  }: ICreateReadingDTO): Promise<Reading> {
    const reading = this.repository.create({
      sensor_node_id,
      collected_at,
      pm10,
      pm25,
      pressure,
      relative_humidity,
      temperature,
    });

    await this.repository.save(reading);

    return reading;
  }

  async findReadingBySensorNodeIdAndCollectedAtDate(
    sensor_node_id: string,
    collected_at: Date
  ): Promise<Reading> {
    const reading = await this.repository.findOne({
      sensor_node_id,
      collected_at,
    });

    return reading;
  }

  async findAllReadingsBySensorNodeId(
    sensor_node_id: string
  ): Promise<Reading[]> {
    const allSensorNodeReadings = await this.repository.find({
      sensor_node_id,
    });

    return allSensorNodeReadings;
  }
}

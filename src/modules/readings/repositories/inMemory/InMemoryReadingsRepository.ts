import { Reading } from '@modules/readings/entities/Reading';
import { ICreateReadingDTO } from '@modules/readings/useCases/createReading/ICreateReadingDTO';

import { IReadingsRepository } from '../IReadingsRepository';

export class InMemoryReadingsRepository implements IReadingsRepository {
  private readings: Reading[] = [];

  async create({
    pm10,
    pm25,
    sensor_node_id,
    pressure,
    relative_humidity,
    temperature,
    collected_at,
  }: ICreateReadingDTO): Promise<Reading> {
    const reading = new Reading();
    Object.assign(reading, {
      pm10,
      pm25,
      sensor_node_id,
      pressure,
      relative_humidity,
      temperature,
      collected_at,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.readings.push(reading);
    return reading;
  }

  async findBySensorNodeIdAndCollectedAtDate(
    sensor_node_id: string,
    collected_at: Date
  ): Promise<Reading> {
    const reading = this.readings.find(
      (reading) =>
        reading.sensor_node_id === sensor_node_id &&
        reading.collected_at === collected_at
    );

    return reading;
  }

  async findAllReadingsBySensorNodeId(
    sensor_node_id: string
  ): Promise<Reading[]> {
    const allSensorNodeReadings = this.readings.filter(
      (reading) => reading.sensor_node_id === sensor_node_id
    );

    return allSensorNodeReadings;
  }
}

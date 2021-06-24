import { InMemoryReadingsRepository } from '@modules/readings/repositories/inMemory/InMemoryReadingsRepository';

import { CreateReadingError } from './CreateReadingError';
import { CreateReadingUseCase } from './CreateReadingUseCase';

let inMemoryReadingsRepository: InMemoryReadingsRepository;
let createReadingUseCase: CreateReadingUseCase;

describe('Create Reading Use Case', () => {
  beforeEach(() => {
    inMemoryReadingsRepository = new InMemoryReadingsRepository();
    createReadingUseCase = new CreateReadingUseCase(inMemoryReadingsRepository);
  });

  const sampleValidReading = {
    pm10: 7.0,
    pm25: 5.2,
    sensor_node_id: 'test-uuid',
    pressure: null,
    relative_humidity: null,
    temperature: null,
    collected_at: new Date(),
  };

  it('should be able to store a reading for a sensor node', async () => {
    const reading = await createReadingUseCase.execute(sampleValidReading);
    const readings =
      await inMemoryReadingsRepository.findAllReadingsBySensorNodeId(
        sampleValidReading.sensor_node_id
      );

    expect(readings).toStrictEqual([reading]);
  });

  it('should not be able to store a duplicated reading for a sensor node', async () => {
    await expect(async () => {
      await createReadingUseCase.execute(sampleValidReading);
      await createReadingUseCase.execute(sampleValidReading);
    }).rejects.toBeInstanceOf(CreateReadingError.ReadingAlreadyExists);
  });

  it('should not be able to store a reading for a sensor node that does not exists', async () => {
    const sampleInvalidSensorNode = {
      pm10: 7.0,
      pm25: 5.2,
      sensor_node_id: 'invalid-sensor-node',
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleInvalidSensorNode);
    }).rejects.toBeInstanceOf(CreateReadingError.SensorNodeNotFound);
  });

  it('should not be able to store a reading with invalid pm10 value', async () => {
    const sampleReadingInvalidPM10 = {
      pm10: -1.0,
      pm25: 5.2,
      sensor_node_id: 'invalid-sensor-node',
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleReadingInvalidPM10);
    }).rejects.toBeInstanceOf(CreateReadingError.InvalidReading);
  });

  it('should not be able to store a reading with invalid pm25 value', async () => {
    const sampleReadingInvalidPM25 = {
      pm10: 10.0,
      pm25: -1.0,
      sensor_node_id: 'invalid-sensor-node',
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleReadingInvalidPM25);
    }).rejects.toBeInstanceOf(CreateReadingError.InvalidReading);
  });
});

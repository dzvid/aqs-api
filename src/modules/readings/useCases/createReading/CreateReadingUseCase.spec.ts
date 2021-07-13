import { InMemoryReadingsRepository } from '@modules/readings/repositories/inMemory/InMemoryReadingsRepository';
import { InMemorySensorNodesRepository } from '@modules/sensorNodes/repositories/inMemory/InMemorySensorNodesRepository';
import { v4 as uuidV4, validate } from 'uuid';

import { CreateReadingError } from './CreateReadingError';
import { CreateReadingUseCase } from './CreateReadingUseCase';

let inMemorySensorNodesRepository: InMemorySensorNodesRepository;
let inMemoryReadingsRepository: InMemoryReadingsRepository;
let createReadingUseCase: CreateReadingUseCase;

const createSensorNode = async (
  inMemorySensorNodesRepository: InMemorySensorNodesRepository
) => {
  const sensorNode = {
    location_latitude: -3.127934,
    location_longitude: -60.039659,
  };

  const newSensorNode = await inMemorySensorNodesRepository.create(sensorNode);

  return newSensorNode;
};

describe('Create Reading Use Case', () => {
  beforeEach(() => {
    inMemorySensorNodesRepository = new InMemorySensorNodesRepository();
    inMemoryReadingsRepository = new InMemoryReadingsRepository();
    createReadingUseCase = new CreateReadingUseCase(
      inMemoryReadingsRepository,
      inMemorySensorNodesRepository
    );
  });

  it('should be able to store a reading for a sensor node', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleValidReading = {
      sensor_node_id: sensorNode.id,
      pm10: 7.0,
      pm25: 5.2,
      pressure: 1013.25,
      relative_humidity: 80,
      temperature: 32,
      collected_at: new Date(),
    };

    const reading = await createReadingUseCase.execute(sampleValidReading);
    const readings =
      await inMemoryReadingsRepository.findAllReadingsBySensorNodeId(
        sampleValidReading.sensor_node_id
      );

    expect(readings).toStrictEqual([reading]);

    expect(validate(reading.id)).toBe(true);
    expect(reading).toHaveProperty('pm10');
    expect(reading).toHaveProperty('pm25');
    expect(reading).toHaveProperty('sensor_node_id');
    expect(reading).toHaveProperty('pressure');
    expect(reading).toHaveProperty('relative_humidity');
    expect(reading).toHaveProperty('temperature');
    expect(reading).toHaveProperty('collected_at');
    expect(reading).toHaveProperty('created_at');
    expect(reading).toHaveProperty('updated_at');
  });

  it('should be able to store a reading with minimal concentrations for pm10 and pm25', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleValidReading = {
      sensor_node_id: sensorNode.id,
      pm10: 0.0,
      pm25: 0.0,
      pressure: 1013.25,
      relative_humidity: 70,
      temperature: 30,
      collected_at: new Date(),
    };

    const reading = await createReadingUseCase.execute(sampleValidReading);
    const readings =
      await inMemoryReadingsRepository.findAllReadingsBySensorNodeId(
        sampleValidReading.sensor_node_id
      );

    expect(readings).toStrictEqual([reading]);

    expect(validate(reading.id)).toBe(true);
    expect(reading).toHaveProperty('pm10');
    expect(reading).toHaveProperty('pm25');
    expect(reading).toHaveProperty('sensor_node_id');
    expect(reading).toHaveProperty('pressure');
    expect(reading).toHaveProperty('relative_humidity');
    expect(reading).toHaveProperty('temperature');
    expect(reading).toHaveProperty('collected_at');
    expect(reading).toHaveProperty('created_at');
    expect(reading).toHaveProperty('updated_at');
  });

  it('should be able to store a reading with null values for optional fields (pressure, relative humidity and temperature) for a sensor node', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleValidReading = {
      sensor_node_id: sensorNode.id,
      pm10: 2.0,
      pm25: 1.6,
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    const reading = await createReadingUseCase.execute(sampleValidReading);
    const readings =
      await inMemoryReadingsRepository.findAllReadingsBySensorNodeId(
        sampleValidReading.sensor_node_id
      );

    expect(readings).toStrictEqual([reading]);

    expect(validate(reading.id)).toBe(true);
    expect(reading).toHaveProperty('pm10');
    expect(reading).toHaveProperty('pm25');
    expect(reading).toHaveProperty('sensor_node_id');
    expect(reading).toHaveProperty('pressure');
    expect(reading).toHaveProperty('relative_humidity');
    expect(reading).toHaveProperty('temperature');
    expect(reading).toHaveProperty('collected_at');
    expect(reading).toHaveProperty('created_at');
    expect(reading).toHaveProperty('updated_at');
  });

  it('should be able to store a reading with undefined values for optional fields (pressure, relative humidity and temperature) for a sensor node', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleValidReading = {
      sensor_node_id: sensorNode.id,
      pm10: 3.6,
      pm25: 10.6,
      pressure: undefined,
      relative_humidity: undefined,
      temperature: undefined,
      collected_at: new Date(),
    };

    const reading = await createReadingUseCase.execute(sampleValidReading);
    const readings =
      await inMemoryReadingsRepository.findAllReadingsBySensorNodeId(
        sampleValidReading.sensor_node_id
      );

    expect(readings).toStrictEqual([reading]);

    expect(validate(reading.id)).toBe(true);
    expect(reading).toHaveProperty('pm10');
    expect(reading).toHaveProperty('pm25');
    expect(reading).toHaveProperty('sensor_node_id');
    expect(reading).toHaveProperty('pressure');
    expect(reading).toHaveProperty('relative_humidity');
    expect(reading).toHaveProperty('temperature');
    expect(reading).toHaveProperty('collected_at');
    expect(reading).toHaveProperty('created_at');
    expect(reading).toHaveProperty('updated_at');
  });

  it('should not be able to store a duplicated reading for a sensor node', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleValidReading = {
      pm10: 7.0,
      pm25: 5.2,
      sensor_node_id: sensorNode.id,
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleValidReading);
      await createReadingUseCase.execute(sampleValidReading);
    }).rejects.toBeInstanceOf(CreateReadingError.ReadingAlreadyExists);
  });

  it('should not be able to store a reading for a sensor node that does not exists', async () => {
    const sampleInvalidSensorNode = {
      pm10: 7.0,
      pm25: 5.2,
      sensor_node_id: uuidV4(),
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
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleReadingInvalidPM10 = {
      pm10: -1.0,
      pm25: 5.2,
      sensor_node_id: sensorNode.id,
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleReadingInvalidPM10);
    }).rejects.toBeInstanceOf(CreateReadingError.ReadingValidationError);
  });

  it('should not be able to store a reading with invalid pm25 value', async () => {
    const sensorNode = await createSensorNode(inMemorySensorNodesRepository);

    const sampleReadingInvalidPM25 = {
      pm10: 10.0,
      pm25: -1.0,
      sensor_node_id: sensorNode.id,
      pressure: null,
      relative_humidity: null,
      temperature: null,
      collected_at: new Date(),
    };

    await expect(async () => {
      await createReadingUseCase.execute(sampleReadingInvalidPM25);
    }).rejects.toBeInstanceOf(CreateReadingError.ReadingValidationError);
  });
});

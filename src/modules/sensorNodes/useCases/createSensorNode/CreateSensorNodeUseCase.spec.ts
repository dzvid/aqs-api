import { InMemorySensorNodesRepository } from '@modules/sensorNodes/repositories/inMemory/InMemorySensorNodesRepository';
import { validate } from 'uuid';

import { CreateSensorNodeError } from './CreateSensorNodeError';
import { CreateSensorNodeUseCase } from './CreateSensorNodeUseCase';

let inMemorySensorNodesRepository: InMemorySensorNodesRepository;
let createSensorNodeUseCase: CreateSensorNodeUseCase;

describe('Create Sensor Node Use Case', () => {
  beforeEach(() => {
    inMemorySensorNodesRepository = new InMemorySensorNodesRepository();
    createSensorNodeUseCase = new CreateSensorNodeUseCase(
      inMemorySensorNodesRepository
    );
  });

  it('should be able to create a new sensor node', async () => {
    const sensorNode = {
      location_latitude: -3.127934,
      location_longitude: -60.039659,
    };

    const newSensorNode = await createSensorNodeUseCase.execute(sensorNode);

    expect(newSensorNode).toHaveProperty('id');
    expect(validate(newSensorNode.id)).toBe(true);
    expect(newSensorNode).toHaveProperty('eid');
    expect(newSensorNode).toHaveProperty('location_latitude');
    expect(newSensorNode).toHaveProperty('location_longitude');
    expect(newSensorNode).toHaveProperty('created_at');
    expect(newSensorNode).toHaveProperty('updated_at');

    const sensorNodeLowerLimits = {
      location_latitude: -90.0,
      location_longitude: -180.0,
    };

    const newSensorNodeLowerLimits = await createSensorNodeUseCase.execute(
      sensorNodeLowerLimits
    );

    expect(newSensorNodeLowerLimits).toHaveProperty('id');
    expect(validate(newSensorNodeLowerLimits.id)).toBe(true);
    expect(newSensorNodeLowerLimits).toHaveProperty('eid');
    expect(newSensorNodeLowerLimits).toHaveProperty('location_latitude');
    expect(newSensorNodeLowerLimits).toHaveProperty('location_longitude');
    expect(newSensorNodeLowerLimits).toHaveProperty('created_at');
    expect(newSensorNodeLowerLimits).toHaveProperty('updated_at');

    const sensorNodeUpperLimits = {
      location_latitude: 90.0,
      location_longitude: 180.0,
    };

    const newSensorNodeUpperLimits = await createSensorNodeUseCase.execute(
      sensorNodeUpperLimits
    );

    expect(newSensorNodeUpperLimits).toHaveProperty('id');
    expect(validate(newSensorNodeUpperLimits.id)).toBe(true);
    expect(newSensorNodeUpperLimits).toHaveProperty('eid');
    expect(newSensorNodeUpperLimits).toHaveProperty('location_latitude');
    expect(newSensorNodeUpperLimits).toHaveProperty('location_longitude');
    expect(newSensorNodeUpperLimits).toHaveProperty('created_at');
    expect(newSensorNodeUpperLimits).toHaveProperty('updated_at');
  });

  it('it should not be able to create a sensor node with invalid latitude and longitude', async () => {
    const sensorNode = {
      location_latitude: -200,
      location_longitude: -300,
    };

    await expect(async () => {
      await createSensorNodeUseCase.execute(sensorNode);
    }).rejects.toBeInstanceOf(CreateSensorNodeError.SensorNodeValidationError);
  });

  it('it should not be able to create a sensor node with invalid latitude', async () => {
    const sensorNode = {
      location_latitude: 90.1,
      location_longitude: -60.039659,
    };

    await expect(async () => {
      await createSensorNodeUseCase.execute(sensorNode);
    }).rejects.toBeInstanceOf(CreateSensorNodeError.SensorNodeValidationError);
  });

  it('it should not be able to create a sensor node with invalid longitude', async () => {
    const sensorNode = {
      location_latitude: -3.127934,
      location_longitude: -300,
    };

    await expect(async () => {
      await createSensorNodeUseCase.execute(sensorNode);
    }).rejects.toBeInstanceOf(CreateSensorNodeError.SensorNodeValidationError);
  });
});

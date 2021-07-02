import { SensorNode } from '@modules/sensorNodes/entities/SensorNode';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

let connection: Connection;
let sensorNode: SensorNode;

describe('Create Reading Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.runMigrations();

    sensorNode = new SensorNode();
    Object.assign(sensorNode, {
      location_latitude: -3.127934,
      location_longitude: -60.039659,
    });

    await connection.query(
      `INSERT INTO SENSOR_NODES(id, eid, location_latitude, location_longitude, created_at, updated_at)
      values('${sensorNode.id}', '${sensorNode.eid}', '${sensorNode.location_latitude}', '${sensorNode.location_longitude}', now(), now())
      `
    );
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  describe('Success to save a reading', () => {
    it('should be able to save a reading for a sensor node', async () => {
      const reading = {
        pm10: 7.0,
        pm25: 5.2,
        pressure: 1013.25,
        relative_humidity: 80,
        temperature: 32,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should be able to store a reading with minimal concentration for pm10', async () => {
      const reading = {
        pm10: 0,
        pm25: 7.5,
        pressure: 1013.25,
        relative_humidity: 80,
        temperature: 32,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should be able to store a reading with minimal concentration for pm25', async () => {
      const reading = {
        pm10: 2.5,
        pm25: 0,
        pressure: 1013.25,
        relative_humidity: 80,
        temperature: 32,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should be able to store a reading with null values for optional fields (pressure, relative humidity and temperature) for a sensor node', async () => {
      const reading = {
        pm10: 2.5,
        pm25: 0,
        pressure: null,
        relative_humidity: null,
        temperature: null,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should be able to store a reading with undefined values for optional fields (pressure, relative humidity and temperature) for a sensor node', async () => {
      const reading = {
        pm10: 2.5,
        pm25: 0,
        pressure: undefined,
        relative_humidity: undefined,
        temperature: undefined,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Failure to save a reading', () => {
    it('should not be able to store a duplicated reading for a sensor node', async () => {
      const reading = {
        pm10: 7.0,
        pm25: 5.2,
        pressure: 1013.25,
        relative_humidity: 80,
        temperature: 32,
        collected_at: new Date(),
      };

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');

      const errorResponse = await request(app)
        .post(`/api/v1/sensor-nodes/${sensorNode.id}/readings`)
        .send(reading);

      expect(errorResponse.status).toBe(400);
      expect(errorResponse.body).toMatchObject({
        message: 'Reading already exists',
      });
    });

    it('should not be able to store a reading for a sensor node that does not exists', async () => {
      const reading = {
        pm10: 7.0,
        pm25: 5.2,
        pressure: 1013.25,
        relative_humidity: 80,
        temperature: 32,
        collected_at: new Date(),
      };

      // theres a very small chance of generating a uuid that matches the one saved in db ¯\_(ツ)_/¯
      const uuidNotAssociatedToASensorNode = uuidV4();

      const response = await request(app)
        .post(`/api/v1/sensor-nodes/${uuidNotAssociatedToASensorNode}/readings`)
        .send(reading);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        message: 'Sensor Node not found',
      });
    });

    // it('should not be able to store a reading with invalid values', () => {});
  });
});

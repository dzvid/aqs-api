import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create Sensor Node Controller', () => {
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new sensor node', async () => {
    const sensorNode = {
      location_latitude: -3.127934,
      location_longitude: -60.039659,
    };

    const response = await request(app)
      .post('/v1/sensor-nodes')
      .send(sensorNode);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('eid');
    expect(response.body).toHaveProperty('location_latitude');
    expect(response.body).toHaveProperty('location_longitude');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });
});

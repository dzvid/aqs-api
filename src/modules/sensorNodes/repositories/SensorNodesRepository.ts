import { getRepository, Repository } from 'typeorm';

import { SensorNode } from '../entities/SensorNode';
import { ICreateSensorNodeDTO } from '../useCases/createSensorNode/ICreateSensorNodeDTO';
import { IUpdateSensorNodeDTO } from '../useCases/updateSensorNode/IUpdateSensorNodeDTO';
import { ISensorNodesRepository } from './ISensorNodesRepository';

export class SensorNodesRepository implements ISensorNodesRepository {
  private repository: Repository<SensorNode>;

  constructor() {
    this.repository = getRepository(SensorNode);
  }

  async create({
    location_latitude,
    location_longitude,
  }: ICreateSensorNodeDTO): Promise<SensorNode> {
    const sensorNode = this.repository.create({
      location_latitude,
      location_longitude,
    });

    await this.repository.save(sensorNode);

    return sensorNode;
  }

  async update(data: IUpdateSensorNodeDTO): Promise<SensorNode> {
    throw new Error('Method not implemented.');
  }

  async delete(sensor_node_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(sensor_node_id: string): Promise<SensorNode> {
    const sensorNode = await this.repository.findOne(sensor_node_id);
    return sensorNode;
  }

  async findAll(): Promise<SensorNode[]> {
    const allSensorNodesQuery = await this.repository
      .createQueryBuilder('s')
      .select('sensor_nodes')
      .from(SensorNode, 'sensor_nodes');

    const sensorNodes = await allSensorNodesQuery.getMany();

    return sensorNodes;
  }
}

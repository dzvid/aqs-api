import { SensorNode } from '@modules/sensorNodes/entities/SensorNode';
import { ICreateSensorNodeDTO } from '@modules/sensorNodes/useCases/createSensorNode/ICreateSensorNodeDTO';
import { IUpdateSensorNodeDTO } from '@modules/sensorNodes/useCases/updateSensorNode/IUpdateSensorNodeDTO';

import { ISensorNodesRepository } from '../ISensorNodesRepository';

export class InMemorySensorNodesRepository implements ISensorNodesRepository {
  private sensor_nodes: SensorNode[] = [];

  async create({
    location_latitude,
    location_longitude,
  }: ICreateSensorNodeDTO): Promise<SensorNode> {
    const sensorNode = new SensorNode();
    Object.assign(sensorNode, {
      location_latitude,
      location_longitude,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.sensor_nodes.push(sensorNode);
    return sensorNode;
  }

  async update(data: IUpdateSensorNodeDTO): Promise<SensorNode> {
    throw new Error('Method not implemented.');
  }

  async delete(sensor_node_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(sensor_node_id: string): Promise<SensorNode> {
    return this.sensor_nodes.find(
      (sensor_node) => sensor_node.id === sensor_node_id
    );
  }

  async findAll(): Promise<SensorNode[]> {
    return this.sensor_nodes;
  }
}

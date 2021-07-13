import { SensorNode } from '../entities/SensorNode';
import { ICreateSensorNodeDTO } from '../useCases/createSensorNode/ICreateSensorNodeDTO';
import { IUpdateSensorNodeDTO } from '../useCases/updateSensorNode/IUpdateSensorNodeDTO';

export interface ISensorNodesRepository {
  create(data: ICreateSensorNodeDTO): Promise<SensorNode>;
  update(data: IUpdateSensorNodeDTO): Promise<SensorNode>;
  delete(sensor_node_id: string): Promise<void>;
  findById(sensor_node_id: string): Promise<SensorNode | undefined>;
  findAll(): Promise<SensorNode[] | undefined>;
}

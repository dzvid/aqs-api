import { SensorNode } from '@modules/sensorNodes/entities/SensorNode';
import { ISensorNodesRepository } from '@modules/sensorNodes/repositories/ISensorNodesRepository';
import { inject, injectable } from 'tsyringe';

import { CreateSensorNodeError } from './CreateSensorNodeError';
import { ICreateSensorNodeDTO } from './ICreateSensorNodeDTO';

@injectable()
export class CreateSensorNodeUseCase {
  constructor(
    @inject('SensorNodesRepository')
    private sensorNodesRepository: ISensorNodesRepository
  ) {}

  async execute({
    location_latitude,
    location_longitude,
  }: ICreateSensorNodeDTO): Promise<SensorNode> {
    if (
      !(location_latitude >= -90 && location_latitude <= 90) ||
      !(location_longitude >= -180 && location_longitude <= 180)
    ) {
      throw new CreateSensorNodeError.InvalidSensorNodeLocation();
    }

    const sensorNode = await this.sensorNodesRepository.create({
      location_latitude,
      location_longitude,
    });

    return sensorNode;
  }
}

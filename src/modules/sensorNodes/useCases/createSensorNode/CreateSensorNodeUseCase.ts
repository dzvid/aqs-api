import { SensorNode } from '@modules/sensorNodes/entities/SensorNode';
import { ISensorNodesRepository } from '@modules/sensorNodes/repositories/ISensorNodesRepository';
import { inject, injectable } from 'tsyringe';

import { CreateSensorNodeError } from './CreateSensorNodeError';
import { CreateSensorNodeValidator } from './CreateSensorNodeValidator';
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
    const { error } = CreateSensorNodeValidator({
      location_latitude,
      location_longitude,
    });

    if (error) {
      throw new CreateSensorNodeError.SensorNodeValidationError(error);
    }

    const sensorNode = await this.sensorNodesRepository.create({
      location_latitude,
      location_longitude,
    });

    return sensorNode;
  }
}

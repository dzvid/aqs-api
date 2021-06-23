import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSensorNodeUseCase } from './CreateSensorNodeUseCase';

export class CreateSensorNodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { location_latitude, location_longitude } = request.body;

    const createSensorNodeUseCase = container.resolve(CreateSensorNodeUseCase);

    const sensorNode = await createSensorNodeUseCase.execute({
      location_latitude,
      location_longitude,
    });

    return response.status(201).send(sensorNode);
  }
}

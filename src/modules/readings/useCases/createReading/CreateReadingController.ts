import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateReadingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {} = request.body;

    const createSensorNodeUseCase = container.resolve(CreateSensorNodeUseCase);

    const sensorNode = await createSensorNodeUseCase.execute({
      location_latitude,
      location_longitude,
    });

    return response.status(201).send(sensorNode);
  }
}

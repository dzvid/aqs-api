import { Reading } from '../entities/Reading';
import { ICreateReadingDTO } from '../useCases/createReading/ICreateReadingDTO';

export interface IReadingsRepository {
  create(data: ICreateReadingDTO): Promise<Reading>;
  findReadingBySensorNodeIdAndCollectedAtDate(
    sensor_node_id: string,
    collected_at: Date
  ): Promise<Reading | undefined>;
  findAllReadingsBySensorNodeId(
    sensor_node_id: string
  ): Promise<Reading[] | undefined>;
}

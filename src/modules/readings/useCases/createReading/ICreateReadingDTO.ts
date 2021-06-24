export interface ICreateReadingDTO {
  relative_humidity?: number;
  temperature?: number;
  pressure?: number;
  pm25: number;
  pm10: number;
  collected_at: Date;
  sensor_node_id: string;
}

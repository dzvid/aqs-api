import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('sensor_nodes')
export class SensorNode {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  eid: string;

  @Column()
  location_latitude: number;

  @Column()
  location_longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.eid = `dtn://aqs-sensor-${this.id}.dtn`;
    }
  }
}

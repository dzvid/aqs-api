import { Reading } from '@modules/readings/entities/Reading';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  location_latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  location_longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Reading, (reading) => reading.sensor_node)
  readings: Reading[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.eid = `dtn://aqs-sensor-${this.id}.dtn`;
    }
  }
}

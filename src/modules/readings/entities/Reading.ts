import { SensorNode } from '@modules/sensorNodes/entities/SensorNode';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'double precision' })
  relative_humidity?: number;

  @Column({ type: 'double precision' })
  temperature?: number;

  @Column({ type: 'double precision' })
  pressure?: number;

  @Column({ type: 'double precision' })
  pm25: number;

  @Column({ type: 'double precision' })
  pm10: number;

  @Column({ type: 'timestamp with time zone' })
  collected_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  sensor_node_id: string;

  @ManyToOne(() => SensorNode, (sensor_node) => sensor_node.readings)
  @JoinColumn({ name: 'sensor_node_id' })
  sensor_node: SensorNode;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

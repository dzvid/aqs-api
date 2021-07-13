import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSensorNodes1624376803875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sensor_nodes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'eid',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'location_latitude',
            type: 'decimal',
            precision: 10,
            scale: 8,
          },
          {
            name: 'location_longitude',
            type: 'decimal',
            precision: 11,
            scale: 8,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sensor_nodes');
  }
}

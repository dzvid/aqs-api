import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReadings1624478048302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'readings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'sensor_node_id',
            type: 'uuid',
          },
          {
            name: 'relative_humidity',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'temperature',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'pressure',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'pm25',
            type: 'double precision',
          },
          {
            name: 'pm10',
            type: 'double precision',
          },
          {
            name: 'collected_at',
            type: 'timestamp with time zone',
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
        foreignKeys: [
          {
            name: 'readings',
            columnNames: ['sensor_node_id'],
            referencedTableName: 'sensor_nodes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('readings');
  }
}

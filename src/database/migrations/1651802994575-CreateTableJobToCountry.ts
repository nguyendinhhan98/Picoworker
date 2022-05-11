import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableJobToCountry1651802994575
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'job_to_country',
        columns: [
          {
            name: 'job_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    const countryForeignKey = new TableForeignKey({
      columnNames: ['country_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'countries',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('job_to_country', countryForeignKey);

    const jobForeignKey = new TableForeignKey({
      columnNames: ['job_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'jobs',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('job_to_country', jobForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job_to_country');
  }
}

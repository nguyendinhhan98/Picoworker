import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableJob1650425492069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'jobs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'job_title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tasks_need_completed',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'additional_notes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'proofs_required',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'job_level',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sub_category',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'payment',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'target_zone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'speed',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'workers_needed',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'max_position',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'workers_will_earn',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'hold_job_time',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'pause_after_approval',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'estimated_job_costs',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
    const categoryForeignKey = new TableForeignKey({
      columnNames: ['category'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('jobs', categoryForeignKey);

    const subCategoryForeignKey = new TableForeignKey({
      columnNames: ['subCategory'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('jobs', subCategoryForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jobs');
  }
}

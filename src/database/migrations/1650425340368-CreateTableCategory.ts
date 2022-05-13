import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCategory1650425340368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'parent_id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isNullable: true,
            default: null,
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
      columnNames: ['parent_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('categories', categoryForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}

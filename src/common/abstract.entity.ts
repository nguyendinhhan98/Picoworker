import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface IAbstractEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class AbstractEntity implements IAbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}

import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity } from 'typeorm';

export interface IUserEntity {
  firstName?: string;
  lastName?: string;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;
}

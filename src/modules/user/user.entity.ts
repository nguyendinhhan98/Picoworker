import { AbstractEntity } from 'src/common/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Constants } from 'src/core/enum/constants.enum';
import { Exclude } from 'class-transformer';

export interface IUserEntity {
  firstName?: string;
  lastName?: string;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName?: string;

  @Column({ nullable: true, name: 'full_name' })
  fullName: string;

  @Column()
  username: string;

  @Column()
  region: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ default: Constants.IS_ADMIN })
  role?: string;

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

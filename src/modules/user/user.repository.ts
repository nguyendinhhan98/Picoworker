import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserPasswordDto } from './dtos/update_user_password.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByEmail(email: string) {
    const user = await this.findOneOrFail({
      where: {
        email: email,
      },
    });

    return user;
  }

  async resetPassword(id: string, body: UpdateUserPasswordDto) {
    await this.update(id, { password: await bcrypt.hash(body.password, 10) });
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  async resetPassword(id: string, password: string) {
    await this.update(id, { password: await bcrypt.hash(password, 10) });
  }

  async changePassword(email: string, password: string) {
    const userData = await this.getUserByEmail(email);
    await this.resetPassword(userData.id, password);
    return {
      message: 'Đổi mật khẩu thành công',
    };
  }
}

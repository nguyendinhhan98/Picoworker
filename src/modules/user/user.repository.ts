import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByEmail(email: string) {
    return this.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: string) {
    return this.findOneOrFail({ id });
  }

  async resetPassword(id: string, newPassword: string) {
    const password = await bcrypt.hash(newPassword, 10);
    return this.update(id, { password });
  }

  async changePassword({ id, password }, { currentPassword, newPassword }) {
    const isMatch = await bcrypt.compareSync(currentPassword, password);
    if (isMatch) {
      const user = await this.getUserById(id);
      await this.resetPassword(user.id, newPassword);
      return {
        message: 'Đổi mật khẩu thành công',
      };
    }
    return {
      message: 'Mật khẩu hiện tại không đúng',
    };
  }
}

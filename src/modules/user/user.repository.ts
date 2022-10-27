import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor(private jwtService: JwtService) {
    super();
  }

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

  async updatePassword(id: string, newPassword: string) {
    const password = await bcrypt.hash(newPassword, 10);
    return this.update(id, { password });
  }

  async changePassword({ id, password }, { currentPassword, newPassword }) {
    const isMatch = await bcrypt.compareSync(currentPassword, password);
    if (isMatch) {
      const user = await this.getUserById(id);
      await this.updatePassword(user.id, newPassword);
      return {
        message: 'Đổi mật khẩu thành công',
      };
    }
    return {
      message: 'Mật khẩu hiện tại không đúng',
    };
  }

  async resetPassword(userId: string, newPassword: string) {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundException('Người dùng không tồn tại!');
    return this.updatePassword(userId, newPassword);
  }
}

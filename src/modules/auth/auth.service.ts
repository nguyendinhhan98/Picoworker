import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    let user: UserEntity;
    try {
      user = await this.userRepository.getUserByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
    // TODO: multiple language
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
  }

  async generateJwtToken(body: { email: string }) {
    let userData: any;
    try {
      userData = await this.userRepository.getUserByEmail(body.email);
      const token = await this.jwtService.signAsync({
        email: userData.email,
        password: userData.password,
      });
      return {
        token,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPassword(body: {
    token_refresh: string;
    password: string;
    password_confirm: string;
  }) {
    try {
      const user = this.jwtService.verify(body.token_refresh);
      if (user) {
        const userData = await this.userRepository.getUserByEmail(user.email);
        await this.userRepository.resetPassword(userData.id, {
          token_refresh: body.token_refresh,
          password: body.password,
          password_confirm: body.password_confirm,
        });
        return {
          message: 'Đổi mật khẩu thành công',
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Link đã hết hạn');
    }
  }

  async sendMail(body: { email: string }) {
    const user = await this.userRepository.getUserByEmail(body.email);
    const new_token = await this.jwtService.signAsync({
      email: user.email,
      password: user.password,
    });

    await this.mailService.sendUserConfirmation(user, new_token);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { ResetPasswordDto } from '../auth/dtos/reset-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('myjwt'))
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() loginAuthDto: LoginDto) {
    let token: any;
    try {
      token = await this.authService.generateJwtToken(loginAuthDto);
    } catch (error) {
      console.log(error);
    }
    return {
      type: 'login',
      ...token,
    };
  }

  @Post('/register')
  @HttpCode(HttpStatus.ACCEPTED)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
  }

  @Post('/forgot-password')
  async sendMail(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.sendMail(forgotPasswordDto);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}

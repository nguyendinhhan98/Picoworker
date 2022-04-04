import {
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
import { UpdateUserPasswordDto } from '../user/dtos/update_user_password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('myjwt'))
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() body) {
    let token: any;
    try {
      token = await this.authService.generateJwtToken(body);
    } catch (error) {
      console.log(error);
    }
    return {
      type: 'login',
      ...token,
    };
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async forgotPassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return await this.authService.forgotPassword(updateUserPasswordDto);
  }

  @Post('/send-mail')
  async sendMail(@Body() body) {
    return await this.authService.sendMail(body);
  }
}

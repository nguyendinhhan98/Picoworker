import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtOAuthGuard } from 'src/core/guards/jwt.guard';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { IUserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @UseGuards(JwtOAuthGuard)
  @ApiBearerAuth()
  @Get('/info')
  @HttpCode(HttpStatus.OK)
  async getInfoUser(@Request() req): Promise<IUserEntity> {
    return await this.userRepository.getUserByEmail(req.user.email);
  }

  @UseGuards(JwtOAuthGuard)
  @ApiBearerAuth()
  @Post('/change-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async changePassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Request() req,
  ) {
    return this.userRepository.changePassword(
      req.user.email,
      updateUserPasswordDto.password,
    );
  }
}

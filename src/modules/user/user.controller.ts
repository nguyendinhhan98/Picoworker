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
import { REGIST_ROLES } from 'src/core/enum/constants.enum';
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
    return await this.userRepository.getUserById(req.user.id);
  }

  @UseGuards(JwtOAuthGuard)
  @ApiBearerAuth()
  @Post('/change-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async changePassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Request() req,
  ) {
    return this.userRepository.changePassword(req.user, updateUserPasswordDto);
  }

  @UseGuards(JwtOAuthGuard)
  @ApiBearerAuth()
  @Post('/switch-role')
  @HttpCode(HttpStatus.ACCEPTED)
  async switchRole(@Request() req) {
    const user = await this.getInfoUser(req);
    const newRole =
      user.role === REGIST_ROLES.WORKER
        ? REGIST_ROLES.EMPLOYER
        : REGIST_ROLES.WORKER;
    await this.userRepository.update(req.user.id, { role: newRole });
  }
}

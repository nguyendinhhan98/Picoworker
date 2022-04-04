import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Constants } from 'src/core/enum/constants.enum';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<IUserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtOAuthGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getUser(@Param() params): Promise<IUserEntity> {
    const user = await this.userRepository.findOne(params.id);
    if (!user) {
      throw new NotFoundException('User not exists');
    }
    return user;
  }

  @UseGuards(JwtOAuthGuard)
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(
    @Param() params,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(params.id, updateUserDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUser(@Param() params): Promise<DeleteResult> {
    return this.userRepository.delete(params.id);
  }
}

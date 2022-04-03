import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<IUserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

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

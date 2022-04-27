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
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { ILocationEntity } from './location.entity';
import { LocationRepository } from './location.repository';
import { Constants } from '../../core/enum/constants.enum';
import { JwtOAuthGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('locations')
@ApiTags('location')
export class LocationController {
  constructor(private locationRepository: LocationRepository) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    const category = this.locationRepository.create(createLocationDto);
    category.parent = createLocationDto.parentId;
    this.locationRepository.save(category);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllLocation(): Promise<ILocationEntity[]> {
    const locations = await this.locationRepository.find();
    return locations;
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getSingleLocation(@Param() params): Promise<ILocationEntity> {
    const location = await this.locationRepository.findOne(params.id);
    if (!location) {
      throw new NotFoundException('location not exists');
    }
    return location;
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateLocation(
    @Param() params,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<UpdateResult> {
    return this.locationRepository.update(params.id, updateLocationDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteLocation(@Param() params): Promise<DeleteResult> {
    return this.locationRepository.delete(params.id);
  }
}

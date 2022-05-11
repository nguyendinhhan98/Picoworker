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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult, Like, UpdateResult } from 'typeorm';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { ICountryEntity } from './country.entity';
import { CountryRepository } from './country.repository';
import { Constants } from '../../core/enum/constants.enum';
import { JwtOAuthGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('countries')
@ApiTags('country')
export class CountryController {
  constructor(private countryRepository: CountryRepository) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    this.countryRepository.save(country);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiQuery({
    name: 'target_zone',
    required: false,
  })
  async getAllCountryByTargetZone(@Query() query): Promise<ICountryEntity[]> {
    return this.countryRepository.find({
      where: {
        targetZone: Like(`%${query.target_zone || ''}%`),
      },
    });
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getSingleCountry(@Param() params): Promise<ICountryEntity> {
    const country = await this.countryRepository.findOne(params.id);
    if (!country) {
      throw new NotFoundException('country not exists');
    }
    return country;
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateCountry(
    @Param() params,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    return this.countryRepository.update(params.id, updateCountryDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCountry(@Param() params): Promise<DeleteResult> {
    return this.countryRepository.delete(params.id);
  }
}

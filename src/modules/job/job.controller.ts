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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { SearchJobDto } from './dtos/search-job.dto';
import { IJobEntity } from './job.entity';
import { JobRepository } from './job.repository';
import { Constants } from '../../core/enum/constants.enum';
import { JwtOAuthGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { CountryRepository } from '../country/country.repository';

@Controller('jobs')
@ApiTags('job')
export class JobController {
  constructor(
    private jobRepository: JobRepository,
    private countryRepository: CountryRepository,
  ) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN, Constants.IS_EMPLOYER])
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createJob(@Body() createJobDto: CreateJobDto) {
    const countries = await this.countryRepository.findByIds(
      createJobDto.countryIds,
    );
    const job = this.jobRepository.create(createJobDto);
    job.countries = countries;
    await this.jobRepository.save(job);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllJob(@Body() searchJobDto?: SearchJobDto): Promise<any> {
    return this.jobRepository.listPagination(searchJobDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getSingleJob(@Param() params): Promise<IJobEntity> {
    const job = await this.jobRepository.findOne(params.id, {
      relations: ['category', 'subCategory', 'countries'],
    });
    if (!job) {
      throw new NotFoundException('job not exists');
    }
    return job;
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN, Constants.IS_EMPLOYER])
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateJob(
    @Param() params,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<any> {
    if (updateJobDto.countryIds.length > 0) {
      const job = await this.jobRepository.findOne(params.id);
      const countries = await this.countryRepository.findByIds(
        updateJobDto.countryIds,
      );
      job.countries = countries;
      return this.jobRepository.save(job);
    }
    delete updateJobDto.countryIds;
    return this.jobRepository.update(params.id, updateJobDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Constants.IS_ADMIN, Constants.IS_EMPLOYER])
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteJob(@Param() params): Promise<DeleteResult> {
    return this.jobRepository.delete(params.id);
  }
}

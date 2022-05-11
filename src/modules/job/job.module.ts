import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from '../country/country.repository';
import { UserModule } from '../user/user.module';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobRepository, CountryRepository]),
    UserModule,
  ],
  controllers: [JobController],
})
export class JobModule {}

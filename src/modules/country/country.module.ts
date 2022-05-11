import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CountryController } from './country.controller';
import { CountryRepository } from './country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository]), UserModule],
  controllers: [CountryController],
})
export class CountryModule {}

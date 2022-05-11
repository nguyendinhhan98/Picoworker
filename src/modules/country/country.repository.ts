import { EntityRepository, Repository } from 'typeorm';
import { CountryEntity } from './country.entity';

@EntityRepository(CountryEntity)
export class CountryRepository extends Repository<CountryEntity> {}

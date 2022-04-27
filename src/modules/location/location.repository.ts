import { EntityRepository, Repository } from 'typeorm';
import { LocationEntity } from './location.entity';

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}

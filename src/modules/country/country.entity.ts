import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { JobEntity } from '../job/job.entity';
import { TargetZone } from 'src/core/enum/constants.enum';
export interface ICountryEntity {
  id: string;
  name: string;
  targetZone: TargetZone[];
}

@Entity({ name: 'countries' })
export class CountryEntity extends AbstractEntity implements ICountryEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    name: 'target_zone',
    type: 'simple-array',
  })
  targetZone: TargetZone[];

  @ManyToMany(() => JobEntity, (job) => job.countries)
  jobs: JobEntity[];
}

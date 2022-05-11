import { AbstractEntity } from '../../common/abstract.entity';
import { JobLevel, TargetZone } from '../../core/enum/constants.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { CountryEntity } from '../country/country.entity';
export interface IJobEntity {
  id: string;
  jobTitle: string;
  tasksNeedCompleted: string[];
  additionalNotes: string;
  proofsRequired: any[];
  jobLevel: string;
  category: string;
  subCategory: string;
  payment: number;
  targetZone: string;
  countries?: any[];
  speed: number;
  workersNeeded: number;
  maxPosition: number;
  workersWillEarn: number;
  holdJobTime: number;
  pauseAfterApproval: boolean;
  estimatedJobCosts: number;
}

export interface IProofsRequired {
  proof: string;
  proofType: string;
}

@Entity({ name: 'jobs' })
export class JobEntity extends AbstractEntity implements IJobEntity {
  @Column({
    name: 'job_title',
    nullable: false,
  })
  jobTitle: string;

  @Column({
    name: 'tasks_need_completed',
    nullable: false,
    type: 'simple-array',
  })
  tasksNeedCompleted: string[];

  @Column({
    name: 'additional_notes',
    nullable: false,
  })
  additionalNotes: string;

  @Column({
    name: 'proofs_required',
    nullable: false,
    type: 'json',
  })
  proofsRequired: IProofsRequired[];

  @Column({
    type: 'enum',
    name: 'job_level',
    enum: JobLevel,
    default: JobLevel.STARTER,
    nullable: false,
  })
  jobLevel: JobLevel;

  @Column({
    type: 'double precision',
    nullable: false,
  })
  payment: number;

  @Column({
    nullable: false,
  })
  speed: number;

  @Column({
    name: 'workers_needed',
    nullable: false,
  })
  workersNeeded: number;

  @Column({
    name: 'max_position',
    nullable: false,
  })
  maxPosition: number;

  @Column({
    name: 'workers_will_earn',
    type: 'double precision',
    nullable: false,
  })
  workersWillEarn: number;

  @Column({
    name: 'hold_job_time',
    nullable: false,
  })
  holdJobTime: number;

  @Column({
    name: 'pause_after_approval',
    nullable: false,
  })
  pauseAfterApproval: boolean;

  @Column({
    name: 'estimated_job_costs',
    type: 'double precision',
    nullable: false,
  })
  estimatedJobCosts: number;

  @ManyToOne(() => CategoryEntity, (category) => category.jobs)
  @JoinColumn({ name: 'category' })
  category: string;

  @ManyToOne(() => CategoryEntity, (category) => category.jobs)
  @JoinColumn({ name: 'sub_category' })
  subCategory: string;

  @Column({
    name: 'target_zone',
    nullable: false,
  })
  targetZone: TargetZone;

  @ManyToMany(() => CountryEntity, (country) => country.jobs, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_to_country',
    joinColumn: {
      name: 'job_id',
    },
    inverseJoinColumn: {
      name: 'country_id',
    },
  })
  countries?: CountryEntity[];
}

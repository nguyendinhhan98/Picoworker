import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProofsRequired } from './proofs-required-job.dto';
import { JobLevel, TargetZone } from 'src/core/enum/constants.enum';
import { CountryEntity } from 'src/modules/country/country.entity';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  jobTitle: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(255)
  @ApiProperty({ type: [String] })
  tasksNeedCompleted: string[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  additionalNotes?: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ApiProperty({ type: [ProofsRequired] })
  @ValidateNested({ each: true })
  @Type(() => ProofsRequired)
  proofsRequired: ProofsRequired[];

  @IsNotEmpty()
  @IsEnum(JobLevel)
  @ApiProperty({ enum: JobLevel })
  jobLevel: JobLevel;

  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({ type: String })
  category: string;

  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({ type: String })
  subCategory: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  payment: number;

  @IsNotEmpty()
  @IsEnum(TargetZone)
  @ApiProperty({ enum: TargetZone })
  targetZone: TargetZone;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [String] })
  countryIds?: CountryEntity[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(1000)
  @ApiProperty({ type: Number })
  speed: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(25)
  @ApiProperty({ type: Number })
  workersNeeded: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({ type: Number })
  maxPosition: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  workersWillEarn: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @Max(30)
  @ApiProperty({ type: Number })
  holdJobTime: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  pauseAfterApproval: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  estimatedJobCosts: number;
}

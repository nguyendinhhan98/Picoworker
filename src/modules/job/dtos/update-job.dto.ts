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

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  jobTitle?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(255)
  @ApiProperty({ type: [String] })
  tasksNeedCompleted?: string[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  additionalNotes?: string;

  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ApiProperty({ type: [Object] })
  @ValidateNested({ each: true })
  @Type(() => ProofsRequired)
  proofsRequired?: any[];

  @IsOptional()
  @IsEnum(JobLevel)
  @ApiProperty({ enum: JobLevel })
  jobLevel?: JobLevel;

  @IsOptional()
  @IsUUID('4')
  @ApiProperty({ type: String })
  category?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiProperty({ type: String })
  subCategory?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  payment?: number;

  @IsOptional()
  @IsEnum(TargetZone)
  @ApiProperty({ enum: TargetZone })
  targetZone?: TargetZone;

  @IsOptional()
  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [String] })
  countryIds?: CountryEntity[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  @ApiProperty({ type: Number })
  speed?: number;

  @IsOptional()
  @IsNumber()
  @Min(25)
  @ApiProperty({ type: Number })
  workersNeeded?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({ type: Number })
  maxPosition?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  workersWillEarn?: number;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(30)
  @ApiProperty({ type: Number })
  holdJobTime?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  pauseAfterApproval?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  estimatedJobCosts?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  arrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { JobLevel, SortOrder } from '../../../core/enum/constants.enum';

export class SearchJobDto {
  @IsOptional()
  @IsEnum(JobLevel)
  @ApiProperty({ enum: JobLevel })
  jobLevel?: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  @ApiProperty({ type: String })
  jobTitle?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiProperty({ type: String })
  category?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiProperty({ type: String })
  subCategory?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ type: [Number] })
  payment?: number[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [String] })
  countryIds?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number })
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: String })
  page?: number = 1;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiProperty({ enum: SortOrder })
  sortOrder?: string = SortOrder.ASC;
}

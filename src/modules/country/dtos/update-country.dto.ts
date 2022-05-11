import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TargetZone } from 'src/core/enum/constants.enum';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  name?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(TargetZone, { each: true })
  @ApiProperty({ type: String })
  @IsOptional()
  targetZone?: TargetZone[];
}

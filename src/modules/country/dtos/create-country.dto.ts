import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TargetZone } from 'src/core/enum/constants.enum';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(TargetZone, { each: true })
  @ApiProperty({ enum: TargetZone, isArray: true })
  targetZone: TargetZone[];
}

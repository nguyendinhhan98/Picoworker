import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exists } from '../../../core/validators/exists.decorator';
import { LocationEntity } from '../location.entity';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @Exists(LocationEntity)
  @ApiProperty()
  @IsUUID('4')
  @IsOptional()
  parentId?: string;
}

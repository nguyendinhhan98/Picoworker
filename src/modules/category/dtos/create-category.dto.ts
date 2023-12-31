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
import { CategoryEntity } from '../category.entity';
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  name: string;

  @Exists(CategoryEntity)
  @ApiProperty({ type: String })
  @IsUUID('4')
  @IsOptional()
  parentId?: string;
}

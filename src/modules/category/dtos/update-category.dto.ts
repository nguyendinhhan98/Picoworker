import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  name?: string;
}

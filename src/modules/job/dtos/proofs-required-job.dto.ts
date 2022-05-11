import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProofType } from 'src/core/enum/constants.enum';

export class ProofsRequired {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ type: String })
  proof: string;

  @IsNotEmpty()
  @IsEnum(ProofType)
  @ApiProperty({ enum: ProofType })
  proofType: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { REGIST_ROLES } from '../../../core/enum/constants.enum';

export class UpdateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9\s]*$/, {
    message: 'Tên của user, chỉ được phép nhập string, số và dấu cách.',
  })
  @IsString()
  @ApiProperty({ type: String })
  fullName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Biệt danh của user, chỉ được phép nhập string, số và ký tự _',
  })
  @ApiProperty({ type: String })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  region?: string;

  @IsOptional()
  @IsEnum(REGIST_ROLES)
  @ApiProperty({ enum: REGIST_ROLES })
  role?: string;
}

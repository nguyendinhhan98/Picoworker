import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9\s]*$/, {
    message: 'Tên của user, chỉ được phép nhập string, số và dấu cách.',
  })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Biệt danh của user, chỉ được phép nhập string, số và ký tự _',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}

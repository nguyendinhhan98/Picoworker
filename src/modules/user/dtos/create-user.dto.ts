import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9\s]*$/, {
    message: 'Tên của user, chỉ được phép nhập string, số và dấu cách.',
  })
  fullName: string;

  @MinLength(6)
  @MaxLength(64)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Biệt danh của user, chỉ được phép nhập string, số và ký tự _',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,64}$/,
    {
      message:
        'Mật khẩu của user, minLength là 8, maxLength là 64, mật khẩu phải bao gồm ký tự thường, ký tự hoa, số và ký tự đặc biêt.',
    },
  )
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { REGIST_ROLES } from '../../../core/enum/constants.enum';
import { Duplicated } from 'src/core/validators/duplicate.decorator';
import { UserEntity } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9\s]*$/, {
    message: 'Tên của user, chỉ được phép nhập string, số và dấu cách.',
  })
  @IsString()
  @ApiProperty({ type: String })
  fullName: string;

  @Duplicated(UserEntity)
  @MinLength(6)
  @MaxLength(64)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Biệt danh của user, chỉ được phép nhập string, số và ký tự _',
  })
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  region: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,64}$/,
    {
      message:
        'Mật khẩu của user, minLength là 8, maxLength là 64, mật khẩu phải bao gồm ký tự thường, ký tự hoa, số và ký tự đặc biêt.',
    },
  )
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @IsEnum(REGIST_ROLES)
  @ApiProperty({ enum: REGIST_ROLES })
  role: string;
}

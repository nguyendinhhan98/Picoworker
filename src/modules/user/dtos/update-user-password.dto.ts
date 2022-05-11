import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/core/validators/match.decorator';

export class UpdateUserPasswordDto {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
    {
      message:
        'Mật khẩu của user, minLength là 8, maxLength là 64, mật khẩu phải bao gồm ký tự thường, ký tự hoa, số và ký tự đặc biêt.',
    },
  )
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsNotEmpty()
  @Match('password')
  @ApiProperty({ type: String })
  password_confirm: string;
}

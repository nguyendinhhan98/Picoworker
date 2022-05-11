import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  password: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  email: string;
}

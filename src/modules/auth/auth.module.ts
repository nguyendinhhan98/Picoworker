import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTConfig } from 'src/core/enum/constants.enum';
import { JwtStrategy } from 'src/core/strategies/jwt.stragety';
import { LocalAuthGuard } from 'src/core/strategies/local_auth.strategy';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
    JwtModule.register({
      secret: JWTConfig.JWT_SECRET,
      signOptions: { expiresIn: JWTConfig.JWT_EXPIRES_IN },
    }),
    MailModule,
  ],
  providers: [AuthService, LocalAuthGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

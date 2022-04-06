import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Picowoker! Confirm your Email',
      template: 'confirmation.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.fullName,
        url,
      },
    });
  }
}

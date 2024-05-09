import { Injectable } from '@nestjs/common';
import { IMailServices } from '../../../core/abstracts/mail-services.abstract';
import { User } from '../../../core/entities';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerMailServices implements IMailServices {
  constructor(private mailerService: MailerService) {}

  sendEmail(userInfo: User) {
    this.mailerService
      .sendMail({
        to: userInfo.email,
        subject: 'Welcome to Payever!',
        template: './confirmation',
        context: {
          name: userInfo.firstName,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}

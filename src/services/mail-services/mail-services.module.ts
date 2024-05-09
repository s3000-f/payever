import { Module } from '@nestjs/common';
import { NodemailerMailServicesModule } from '../../frameworks/mail-services/nodemailer/nodemailer-mail-services.module';

@Module({
  imports: [NodemailerMailServicesModule],
  exports: [NodemailerMailServicesModule],
})
export class MailServicesModule {}

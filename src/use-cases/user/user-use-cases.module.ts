import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-case';
import { RemoteServicesModule } from '../../services/remote-services/remote-services.module';
import { FileServicesModule } from '../../services/file-services/file-services.module';
import { MessageQueueServicesModule } from '../../services/message-queue-services/message-queue-services.module';
import { MailServicesModule } from '../../services/mail-services/mail-services.module';

@Module({
  imports: [
    DataServicesModule,
    RemoteServicesModule,
    FileServicesModule,
    MailServicesModule,
    MessageQueueServicesModule,
  ],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}

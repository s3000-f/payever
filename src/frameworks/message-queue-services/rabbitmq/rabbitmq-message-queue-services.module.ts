import { Module } from '@nestjs/common';
import { IMessageQueueServices } from '../../../core';
import { RabbitmqMessageQueueServices } from './rabbitmq-message-queue-services.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ConfigService,
    {
      provide: IMessageQueueServices,
      useClass: RabbitmqMessageQueueServices,
    },
  ],
  exports: [IMessageQueueServices],
})
export class RabbitmqMessageQueueServicesModule {}

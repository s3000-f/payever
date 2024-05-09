import { Module } from '@nestjs/common';
import { RabbitmqMessageQueueServicesModule } from '../../frameworks/message-queue-services/rabbitmq/rabbitmq-message-queue-services.module';

@Module({
  imports: [RabbitmqMessageQueueServicesModule],
  exports: [RabbitmqMessageQueueServicesModule],
})
export class MessageQueueServicesModule {}

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IMessageQueueServices } from '../../../core';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqMessageQueueServices
  implements IMessageQueueServices, OnApplicationBootstrap
{
  private _connection: amqp.Connection;
  private _channel: amqp.Channel;
  private isReady = false;

  setChannel_Test(value: amqp.Channel) {
    this._channel = value;
  }

  constructor(private configService: ConfigService) {}
  async init() {
    if (this.isReady) return this;
    this._connection = await amqp.connect(
      this.configService.get('RABBITMQ_URL'),
    );

    this._channel = await this._connection.createChannel();
    await this._channel.assertExchange('user_created', 'fanout');
    this.isReady = true;
    return this;
  }

  async sendMessage(message: any) {
    (await this.init())._channel.publish(
      'user_created',
      '',
      Buffer.from(JSON.stringify(message)),
    );
  }

  onApplicationBootstrap() {
    this.init();
  }
}

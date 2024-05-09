import { RabbitmqMessageQueueServices } from './rabbitmq-message-queue-services.service';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

jest.mock('amqplib', () => ({
  connect: jest.fn(),
}));
jest.mock('@nestjs/config');

describe('RabbitmqMessageQueueServices', () => {
  let service: RabbitmqMessageQueueServices;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    service = new RabbitmqMessageQueueServices(configService);
  });

  describe('init', () => {
    it('should initialize only once and create a connection and channel', async () => {
      const mockConnection = {
        createChannel: jest.fn().mockResolvedValue({
          assertExchange: jest.fn().mockResolvedValue({}),
        }),
      };
      amqp.connect.mockResolvedValue(mockConnection);
      jest.spyOn(configService, 'get').mockReturnValue('amqp://localhost');

      const result = await service.init();

      expect(amqp.connect).toHaveBeenCalledWith('amqp://localhost');
      expect(mockConnection.createChannel).toHaveBeenCalled();
      expect(result).toBe(service);

      await service.init();
      expect(amqp.connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('sendMessage', () => {
    it('should send a message using the RabbitMQ channel', async () => {
      const mockChannel = {
        publish: jest.fn(),
      };
      const mockConnection = {
        createChannel: jest.fn().mockResolvedValue(mockChannel),
      };
      amqp.connect.mockResolvedValue(mockConnection);
      jest.spyOn(configService, 'get').mockReturnValue('amqp://localhost');
      jest.spyOn(service, 'init').mockResolvedValue(service);

      service.setChannel_Test(mockChannel);

      const testMessage = { name: 'Test User' };
      await service.sendMessage(testMessage);

      expect(service.init).toHaveBeenCalled();
      expect(mockChannel.publish).toHaveBeenCalledWith(
        'user_created',
        '',
        Buffer.from(JSON.stringify(testMessage)),
      );
    });
  });

  describe('onApplicationBootstrap', () => {
    it('should initialize on application bootstrap', async () => {
      const initSpy = jest.spyOn(service, 'init').mockResolvedValue(undefined);
      service.onApplicationBootstrap();
      expect(initSpy).toHaveBeenCalled();
    });
  });
});

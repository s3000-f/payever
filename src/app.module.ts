import { Module } from '@nestjs/common';
import { UserController, UsersController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageQueueServicesModule } from './services/message-queue-services/message-queue-services.module';
import { MailServicesModule } from './services/mail-services/mail-services.module';
import { FileServicesModule } from './services/file-services/file-services.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RemoteServicesModule } from './services/remote-services/remote-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: +config.get('REDIS_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 60 * 60 * 24 * 7,
        };
      },
      inject: [ConfigService],
    }),
    DataServicesModule,
    MessageQueueServicesModule,
    MailServicesModule,
    FileServicesModule,
    RemoteServicesModule,
    UserUseCasesModule,
  ],
  controllers: [UserController, UsersController],
  providers: [],
})
export class AppModule {}

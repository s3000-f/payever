import { Module } from '@nestjs/common';
import { RegresRemoteServices } from './regres-remote-services.service';
import { IRemoteServices } from '../../../core/abstracts/remote-services.abstract';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IRemoteServices,
      useClass: RegresRemoteServices,
    },
  ],
  exports: [IRemoteServices],
})
export class RegresRemoteServicesModule {}

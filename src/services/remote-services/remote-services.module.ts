import { Module } from '@nestjs/common';
import { RegresRemoteServicesModule } from '../../frameworks/remote-services/regres/regres-remote-services.module';

@Module({
  imports: [RegresRemoteServicesModule],
  exports: [RegresRemoteServicesModule],
})
export class RemoteServicesModule {}

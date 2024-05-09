import { Module } from '@nestjs/common';
import { FsFileServicesModule } from '../../frameworks/file-services/fs/fs-file-services.module';

@Module({
  imports: [FsFileServicesModule],
  exports: [FsFileServicesModule],
})
export class FileServicesModule {}

import { Module } from '@nestjs/common';
import { FsFileServices } from './fs-file-services.service';
import { IFileServices } from '../../../core/abstracts/file-services.abstract';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IFileServices,
      useClass: FsFileServices,
    },
  ],
  exports: [IFileServices],
})
export class FsFileServicesModule {}

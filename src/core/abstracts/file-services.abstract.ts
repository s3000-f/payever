import { FileInfo } from '../entities/file-info.entity';

export abstract class IFileServices {
  abstract retrieveFile(url: string): Promise<FileInfo>;
  abstract removeFile(path: string);
}

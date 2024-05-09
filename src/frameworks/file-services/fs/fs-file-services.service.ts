import { Injectable } from '@nestjs/common';
import { IFileServices } from '../../../core/abstracts/file-services.abstract';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { FileInfo } from '../../../core/entities/file-info.entity';
@Injectable()
export class FsFileServices implements IFileServices {
  constructor(private readonly httpService: HttpService) {}

  async retrieveFile(url: string): Promise<FileInfo> {
    const response = await lastValueFrom(
      this.httpService.get(url, { responseType: 'arraybuffer' }),
    );
    const avatarHash = `${crypto.randomBytes(16).toString('hex')}.jpg`;
    const avatarPath = `${process.cwd()}/avatars/${avatarHash}`;
    fs.writeFileSync(avatarPath, response.data);
    const fileHash = await this.getHash(avatarPath);
    return {
      file: avatarPath,
      url: url,
      hash: fileHash,
    } as FileInfo;
  }

  public async getHash(path): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const rs = fs.createReadStream(path);
      rs.on('error', reject);
      rs.on('data', (chunk) => hash.update(chunk));
      rs.on('end', () => resolve(hash.digest('hex')));
    });
  }

  async removeFile(filePath: string) {
    await fs.promises.unlink(filePath);
  }
}

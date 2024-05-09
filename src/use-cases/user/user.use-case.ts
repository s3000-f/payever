import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataServices, IMessageQueueServices } from '../../core';
import { UserFactoryService } from './user-factory.service';
import { CreateUserDto, CreateUserResponseDto } from '../../core/dtos';
import { IMailServices } from '../../core/abstracts/mail-services.abstract';
import { IFileServices } from '../../core/abstracts/file-services.abstract';
import { IRemoteServices } from '../../core/abstracts/remote-services.abstract';
import * as fs from 'fs';
//
@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
    private remoteServices: IRemoteServices,
    private messageQueueServices: IMessageQueueServices,
    private mailServices: IMailServices,
    private fileServices: IFileServices,
    private userFactoryService: UserFactoryService,
  ) {}

  async getUserById(id: number): Promise<CreateUserResponseDto> {
    const user = await this.remoteServices.retrieveUser(id);
    return this.userFactoryService.createUserResponse(user);
  }

  async getUserAvatar(id: number): Promise<string> {
    let avatar = await this.dataServices.avatars.get(id);
    if (!avatar) {
      const user = await this.getUserById(id);
      const file = await this.fileServices.retrieveFile(
        user.createdUser.avatarURL,
      );
      avatar = this.userFactoryService.createNewAvatar(id, file);
      avatar = await this.dataServices.avatars.create(avatar);
    }
    const avatarBuffer = fs.readFileSync(avatar.file);
    return Buffer.from(avatarBuffer).toString('base64');
  }

  async deleteUserAvatar(id: number) {
    const avatar = await this.dataServices.avatars.get(id);
    if (!avatar) throw new NotFoundException('Avatar Not Found!');
    await this.fileServices.removeFile(avatar.file);
    return this.dataServices.avatars.delete(id);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    const dbUser = await this.dataServices.users.create(user);
    await this.messageQueueServices.sendMessage(user);
    await this.mailServices.sendEmail(user);
    return this.userFactoryService.createUserResponse(dbUser);
  }
}

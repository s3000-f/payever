import { Injectable } from '@nestjs/common';
import { Avatar, User } from '../../core/entities';
import { CreateUserDto, CreateUserResponseDto } from '../../core/dtos';
import { FileInfo } from '../../core/entities/file-info.entity';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    return {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      id: createUserDto.id,
      avatarURL: createUserDto.avatarUrl,
    } as User;
  }

  createNewAvatar(id: number, file: FileInfo) {
    return {
      file: file.file,
      id: id,
      url: file.url,
      hash: file.hash,
    } as Avatar;
  }
  createUserResponse(user: User): CreateUserResponseDto {
    return {
      success: true,
      createdUser: {
        id: user.id,
        avatarURL: user.avatarURL,
        lastName: user.lastName,
        email: user.email,
        firstName: user.firstName,
      },
    };
  }
}

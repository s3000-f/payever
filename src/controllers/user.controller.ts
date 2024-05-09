import {
  Controller,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from '../core/filters/http-exception.filter';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get(':userId')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('userId') userId: any) {
    return this.userUseCases.getUserById(userId);
  }

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: any) {
    return this.userUseCases.getUserAvatar(userId);
  }

  @Delete(':userId/avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAvatar(@Param('userId') userId: any) {
    return this.userUseCases.deleteUserAvatar(userId);
  }
}

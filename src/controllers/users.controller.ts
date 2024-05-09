import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { CreateUserDto } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { HttpExceptionFilter } from '../core/filters/http-exception.filter';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private userUseCases: UserUseCases) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }
}

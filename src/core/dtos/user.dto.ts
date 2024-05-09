import { IsString, IsNotEmpty, IsEmail, IsInt, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  //Due to id being external (regres) and not aligining with mongodb id, It is requested.
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatarUrl: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

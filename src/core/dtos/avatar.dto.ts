import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAvatarDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: string;
}

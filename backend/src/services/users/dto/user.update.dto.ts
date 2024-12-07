import { ArrayMaxSize } from 'class-validator';

export class UpdateUserDto {
  @ArrayMaxSize(10)
  roles: string[];
}

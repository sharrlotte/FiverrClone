import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  avatar: string;

  @Expose()
  username: string;
}

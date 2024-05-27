import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  avatar: string | null;

  @Expose()
  username: string;
}

export class UserProfileResponse extends UserResponse {
  @Expose()
  about: string;
}

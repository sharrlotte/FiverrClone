import { Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/services/users/dto/user.reponse';

export class PostResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  stars: number;

  @Expose()
  favorites: number;

  @Expose()
  thumbnail: number;

  @Expose()
  isFavorite: boolean;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}

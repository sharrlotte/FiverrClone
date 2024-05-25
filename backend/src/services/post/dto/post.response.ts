import { Expose } from 'class-transformer';

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
}

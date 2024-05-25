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
  stars: bigint;

  @Expose()
  favorites: bigint;
}

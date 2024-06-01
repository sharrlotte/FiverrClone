import { DurationType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/services/users/dto/user.response';

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
  totalStars: number;

  @Expose()
  starsCount: number;

  @Expose()
  favorites: number;

  @Expose()
  isFavorite: boolean;

  @Expose()
  images: string[]

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}

export class Package {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  revision: number;

  @Expose()
  deliveryTime: number;

  @Expose()
  durationType: DurationType;

  @Expose()
  @Type(() => BigInt)
  price: BigInt;
}

export class PostDetailResponse extends PostResponse {
  @Expose()
  @Type(() => Package)
  packages: Package[];
}

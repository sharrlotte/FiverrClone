import { Expose, Type } from 'class-transformer';
import { PackageResponse } from 'src/services/packages/dto/package-response.dto';
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
  images: string[];

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;

  @Expose()
  createdAt: Date;
}

export class PostDetailResponse extends PostResponse {
  @Expose()
  @Type(() => PackageResponse)
  packages: PackageResponse[];
}

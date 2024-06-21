import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PackageResponse } from 'src/services/packages/dto/package-response.dto';
import { PostResponse } from 'src/services/post/dto/post.response';
import { UserResponse } from 'src/services/users/dto/user.response';

class PostInOrderResponse extends PickType(PostResponse, ['id', 'title']) {}

export class OrderResponse {
  @Expose()
  id: number;

  @Expose()
  postId: number;

  post: PostInOrderResponse;
}

export class OrderDetailResponse extends OrderResponse {
  @Expose()
  @Type(() => PackageResponse)
  package: PackageResponse;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}

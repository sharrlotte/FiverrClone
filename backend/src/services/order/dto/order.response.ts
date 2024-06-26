import { PickType } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { PackageResponse } from 'src/services/packages/dto/package-response.dto';
import { PostResponse } from 'src/services/post/dto/post.response';
import { UserResponse } from 'src/services/users/dto/user.response';

class UserInOrderResponse extends PickType(UserResponse, ['id', 'username', 'avatar']) {}
class PostInOrderResponse extends PickType(PostResponse, ['id', 'title', 'images', 'createdAt']) {
  @Expose()
  @Type(() => UserInOrderResponse)
  user: UserInOrderResponse;
}

export class OrderResponse {
  @Expose()
  id: number;

  @Expose()
  postId: number;

  @Expose()
  @Type(() => PostInOrderResponse)
  post: PostInOrderResponse;

  @Expose()
  @Type(() => PackageResponse)
  package: PackageResponse;

  @Expose()
  deliveryTime: Date;

  @Expose()
  status: OrderStatus;
}

export class OrderDetailResponse extends OrderResponse {
  @Expose()
  @Type(() => PackageResponse)
  package: PackageResponse;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}

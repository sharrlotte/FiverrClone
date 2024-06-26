import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getSession } from 'src/services/auth/auth.utils';
import { PostResponse } from 'src/services/post/dto/post.response';
import { PostService } from 'src/services/post/post.service';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { UserProfileResponse, UserResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { PostPaginationQueryDto } from 'src/services/post/dto/post-pagination-query.dto';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get('/@me/posts')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findAllPost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMe(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/favorite-posts')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findAllFavoritePost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMeFavorite(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/post-browsing-history')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findAllPostBrowsingHistory(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMeBrowsingHistory(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(UserResponse, this.userService.get(id));
  }

  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return plainToInstance(UserProfileResponse, this.userService.getProfile(id));
  }

  @Get('@me/profile')
  getMeProfile(@Req() req: Request) {
    const session = getSession(req);
    return plainToInstance(UserProfileResponse, this.userService.getProfile(session.id));
  }

  @Roles(['USER'])
  @UseGuards(RolesGuard)
  @Patch('@me/profile')
  updateProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const session = getSession(req);

    return plainToInstance(UserProfileResponse, this.userService.updateProfile(id, session, updateProfileDto));
  }

  @Get('@me/orders')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.userService.findAllOrder(session, query).then((items) => items.map((item) => plainToInstance(OrderResponse, item)));
  }
}

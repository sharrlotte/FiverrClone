import { Body, Controller, Get, Param, ParseIntPipe, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getSession, getSessionOrNull } from 'src/services/auth/auth.utils';
import { PostResponse } from 'src/services/post/dto/post.response';
import { PostService } from 'src/services/post/post.service';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { UserProfileResponse, UserResponse, UserWithRolesAndAuthorities } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { PostPaginationQueryDto } from 'src/services/post/dto/post-pagination-query.dto';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { PaginationQueryDto, UserPaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';
import { SessionResponseDto } from 'src/services/auth/dto/session.dto';
import { UpdateUserDto } from 'src/services/users/dto/user.update.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get('/session')
  getSession(@Req() req: Request): SessionResponseDto | null {
    const session = getSessionOrNull(req);

    if (session === null) {
      return null;
    }

    return plainToInstance(SessionResponseDto, {
      ...session,
      rolePicked: !session.roles.some((role) => role === 'CANDIDATE' || role === 'RECRUITER'),
    });
  }

  @Get('')
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  findAllUser(@Query() query: UserPaginationQueryDto) {
    return this.userService.findAll(query).then((items) => items.map((item) => plainToInstance(UserWithRolesAndAuthorities, item)));
  }

  @Get('/@me/posts')
  @Roles([])
  @UseGuards(RolesGuard)
  findAllPost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMe(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/favorite-posts')
  @Roles([])
  @UseGuards(RolesGuard)
  findAllFavoritePost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMeFavorite(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/post-browsing-history')
  @Roles([])
  @UseGuards(RolesGuard)
  findAllPostBrowsingHistory(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.findAllByMeBrowsingHistory(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(UserProfileResponse, this.userService.get(id));
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

  @Roles([])
  @UseGuards(RolesGuard)
  @Patch('@me/profile')
  updateProfile(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const session = getSession(req);

    return plainToInstance(UserProfileResponse, this.userService.updateProfile(session, updateProfileDto));
  }

  @Get('@me/orders')
  @Roles([])
  @UseGuards(RolesGuard)
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.userService.findAllOrder(session, query).then((items) => items.map((item) => plainToInstance(OrderResponse, item)));
  }

  @Put(':id')
  put(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return plainToInstance(UserResponse, this.userService.update(id, updateUserDto));
  }
}

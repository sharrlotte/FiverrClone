import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { getAuthUser } from 'src/services/auth/auth.utils';
import { PostResponse } from 'src/services/post/dto/post.response';
import { PostService } from 'src/services/post/post.service';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { UserProfileResponse, UserResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { PostPaginationQueryDto } from 'src/services/post/dto/post-pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get('/@me/posts')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllPost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMe(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/favorite-posts')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllFavoritePost(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMeFavorite(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/post-browsing-history')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllPostBrowsingHistory(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMeFavorite(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return plainToInstance(UserResponse, this.userService.get(+id));
  }

  @Get(':id/profile')
  getProfile(@Param('id') id: string, @Req() req: Request) {
    return plainToInstance(UserProfileResponse, this.userService.getProfile(+id));
  }

  @Get('@me/profile')
  getMeProfile(@Req() req: Request) {
    const session = getAuthUser(req);
    return plainToInstance(UserProfileResponse, this.userService.getProfile(session.id));
  }

  @Roles(['USER'])
  @UseGuards(AuthGuard)
  @Patch('@me/profile')
  updateProfile(@Param('id') id: string, @Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const session = getAuthUser(req);

    return plainToInstance(UserProfileResponse, this.userService.updateProfile(+id, session, updateProfileDto));
  }
}

import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { getAuthUser } from 'src/services/auth/auth.utils';
import { PostResponse } from 'src/services/post/dto/post.response';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import { PostService } from 'src/services/post/post.service';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { UserResponse } from 'src/services/users/dto/user.reponse';

@Controller('users')
export class UsersController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}
  @Get('/@me/posts')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllPost(@Query() query: TitlePaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMe({ ...query, userId: session.id }).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/favorite-posts')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllFavoritePost(@Query() query: TitlePaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMeFavorite({ ...query, userId: session.id }).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
  @Get('/@me/post-browsing-history')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAllPostBrowsingHistory(@Query() query: TitlePaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMeFavorite({ ...query, userId: session.id }).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return plainToInstance(UserResponse, this.userService.get(+id));
  }
}

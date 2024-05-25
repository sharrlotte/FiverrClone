import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { getAuthUser } from 'src/services/auth/auth.utils';
import { PostResponse } from 'src/services/post/dto/post.response';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import { PostService } from 'src/services/post/post.service';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly postService: PostService) {}
  @Get('/@me/posts')
  @Roles(['USER'])
  @UseGuards(AuthGuard)
  findAll(@Query() query: TitlePaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.findAllByMe({ ...query, userId: session.id }).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }
}

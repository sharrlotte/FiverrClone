import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import { plainToInstance } from 'class-transformer';
import { PostDetailResponse, PostResponse } from 'src/services/post/dto/post.response';
import { Request } from 'express';
import { getAuthUser, getUser } from 'src/services/auth/auth.utils';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { Roles } from 'src/shared/decorator/role.decorator';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  @FormDataRequest()
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = getAuthUser(req);

    return plainToInstance(PostResponse, this.postService.create(user, createPostDto));
  }

  @Post(':id/favorite')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  favorite(@Param('id') id: string, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.favorite(+id, session);
  }
  @Post(':id/visit')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  visit(@Param('id') id: string, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.postService.visit(+id, session);
  }

  @Get()
  findAll(@Query() query: TitlePaginationQueryDto, @Req() req: Request) {
    const session = getUser(req);
    return this.postService.findAll(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const session = getUser(req);
    return plainToInstance(PostDetailResponse, this.postService.findOne(+id, session));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return plainToInstance(PostResponse, this.postService.update(+id, updatePostDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

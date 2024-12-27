import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { plainToInstance } from 'class-transformer';
import { PostDetailResponse, PostResponse } from 'src/services/post/dto/post.response';
import { Request } from 'express';
import { getSession, getSessionOrNull } from 'src/services/auth/auth.utils';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { Roles } from 'src/shared/decorator/role.decorator';
import { FormDataRequest } from 'nestjs-form-data';
import { PostPaginationQueryDto } from 'src/services/post/dto/post-pagination-query.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles([])
  @UseGuards(RolesGuard)
  @FormDataRequest()
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = getSession(req);

    return plainToInstance(PostResponse, this.postService.create(user, createPostDto));
  }

  @Post(':id/favorite')
  @Roles([])
  @UseGuards(RolesGuard)
  favorite(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.favorite(id, session);
  }
  @Post(':id/visit')
  @Roles([])
  @UseGuards(RolesGuard)
  visit(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.postService.visit(id, session);
  }

  @Get()
  findAll(@Query() query: PostPaginationQueryDto, @Req() req: Request) {
    const session = getSessionOrNull(req);
    return this.postService.findAll(session, query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSessionOrNull(req);
    return plainToInstance(PostDetailResponse, this.postService.findOne(id, session));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return plainToInstance(PostResponse, this.postService.update(id, updatePostDto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}

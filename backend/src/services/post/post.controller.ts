import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import { plainToInstance } from 'class-transformer';
import { PostResponse } from 'src/services/post/dto/post.response';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return plainToInstance(PostResponse, this.postService.create(createPostDto));
  }

  @Get()
  findAll(@Query() query: TitlePaginationQueryDto) {
    return this.postService.findAll(query).then((items) => items.map((item) => plainToInstance(PostResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return plainToInstance(PostResponse, this.postService.findOne(+id));
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

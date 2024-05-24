import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { ApiBody } from '@nestjs/swagger';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { plainToInstance } from 'class-transformer';
import { PostCategoryResponse } from 'src/services/post-category/dto/post-category.response';

@Controller('post-categories')
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @ApiBody({ type: CreatePostCategoryDto })
  @Post()
  create(@Body() createPostCategoryDto: CreatePostCategoryDto) {
    return plainToInstance(PostCategoryResponse, this.postCategoryService.create(createPostCategoryDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.postCategoryService.findAll(query).then((items) => items.map((item) => plainToInstance(PostCategoryResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return plainToInstance(PostCategoryResponse, this.postCategoryService.findOne(+id));
  }

  @ApiBody({ type: UpdatePostCategoryDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostCategoryDto: UpdatePostCategoryDto) {
    return plainToInstance(PostCategoryResponse, this.postCategoryService.update(+id, updatePostCategoryDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCategoryService.remove(+id);
  }
}

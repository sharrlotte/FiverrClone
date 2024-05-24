import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TagResponse } from 'src/services/tag/dto/tag-response.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiBody({ type: CreateTagDto })
  create(@Body() createTagDto: CreateTagDto) {
    return plainToInstance(TagResponse, this.tagService.create(createTagDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.tagService.findAll(query).then((items) => items.map((item) => plainToInstance(TagResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(TagResponse, this.tagService.findOne(id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTagDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto) {
    return plainToInstance(TagResponse, this.tagService.update(id, updateTagDto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.remove(id);
  }
}

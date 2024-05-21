import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';
import { ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TagResponseDto } from 'src/services/tag/dto/tag-response.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiBody({ type: CreateTagDto })
  create(@Body() createTagDto: CreateTagDto) {
    return plainToInstance(TagResponseDto, this.tagService.create(createTagDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return plainToInstance(TagResponseDto, this.tagService.findAll(query));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(TagResponseDto, this.tagService.findOne(id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTagDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto) {
    return plainToInstance(TagResponseDto, this.tagService.update(id, updateTagDto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.remove(id);
  }
}

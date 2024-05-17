import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ApiBody } from '@nestjs/swagger';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';

@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Post()
  @ApiBody({ type: [CreateSkillCategoryDto] })
  create(@Body() createSkillCategoryDto: CreateSkillCategoryDto) {
    return this.skillCategoryService.create(createSkillCategoryDto);
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.skillCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: [UpdateSkillCategoryDto] })
  update(@Param('id') id: string, @Body() updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return this.skillCategoryService.update(+id, updateSkillCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillCategoryService.remove(+id);
  }
}

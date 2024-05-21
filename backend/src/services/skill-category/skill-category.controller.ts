import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ApiBody } from '@nestjs/swagger';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';
import { plainToInstance } from 'class-transformer';
import { SkillCategoryResponseDto } from 'src/services/skill-category/dto/skill-category-response';

@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Post()
  @ApiBody({ type: CreateSkillCategoryDto })
  create(@Body() createSkillCategoryDto: CreateSkillCategoryDto) {
    return plainToInstance(SkillCategoryResponseDto, this.skillCategoryService.create(createSkillCategoryDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.skillCategoryService.findAll(query).then((items) => items.map((item) => plainToInstance(SkillCategoryResponseDto, item)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return plainToInstance(SkillCategoryResponseDto, this.skillCategoryService.findOne(+id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSkillCategoryDto })
  update(@Param('id') id: string, @Body() updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return plainToInstance(SkillCategoryResponseDto, this.skillCategoryService.update(+id, updateSkillCategoryDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillCategoryService.remove(+id);
  }
}

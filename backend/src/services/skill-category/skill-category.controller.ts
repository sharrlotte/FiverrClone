import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ApiBody } from '@nestjs/swagger';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { plainToInstance } from 'class-transformer';
import { SkillCategoryResponse } from 'src/services/skill-category/dto/skill-category-response';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/shared/guard/role.guard';

@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly skillCategoryService: SkillCategoryService) {}

  @Post()
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateSkillCategoryDto })
  create(@Body() createSkillCategoryDto: CreateSkillCategoryDto) {
    return plainToInstance(SkillCategoryResponse, this.skillCategoryService.create(createSkillCategoryDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.skillCategoryService.findAll(query).then((items) => items.map((item) => plainToInstance(SkillCategoryResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(SkillCategoryResponse, this.skillCategoryService.findOne(id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSkillCategoryDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return plainToInstance(SkillCategoryResponse, this.skillCategoryService.update(id, updateSkillCategoryDto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillCategoryService.remove(id);
  }
}

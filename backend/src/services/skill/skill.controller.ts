import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { SkillResponse } from 'src/services/skill/dto/skill-response.dto';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @ApiBody({ type: CreateSkillDto })
  create(@Body() createSkillDto: CreateSkillDto) {
    return plainToInstance(SkillResponse, this.skillService.create(createSkillDto));
  }

  @Get()
  findAll(@Query() query: NamePaginationQueryDto) {
    return this.skillService.findAll(query).then((items) => items.map((item) => plainToInstance(SkillResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(SkillResponse, this.skillService.findOne(id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSkillDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSkillDto: UpdateSkillDto) {
    return plainToInstance(SkillResponse, this.skillService.update(id, updateSkillDto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.remove(id);
  }
}

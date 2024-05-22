import { Injectable } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';
import Conflict from 'src/error/Conflict';
import NotFound from 'src/error/NotFound';
import { SkillCategory } from '@prisma/client';

@Injectable()
export class SkillCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSkillCategoryDto: CreateSkillCategoryDto): Promise<SkillCategory> {
    const duplicateName = await this.prisma.skillCategory.findFirst({ where: { name: createSkillCategoryDto.name } });

    if (duplicateName) {
      throw new Conflict<typeof createSkillCategoryDto>('name');
    }

    return this.prisma.skillCategory.create({ data: { ...createSkillCategoryDto, createdAt: new Date() } });
  }

  findAll({ name, page, size }: NamePaginationQueryDto): Promise<SkillCategory[]> {
    return this.prisma.skillCategory.findMany({ where: { name }, orderBy: { createdAt: 'desc' }, take: size, skip: size * page });
  }

  async findOne(id: number): Promise<SkillCategory> {
    const skillCategory = await this.prisma.skillCategory.findUnique({ where: { id } });

    if (!skillCategory) {
      throw new NotFound('id');
    }

    return skillCategory;
  }

  async update(id: number, updateSkillCategoryDto: UpdateSkillCategoryDto): Promise<SkillCategory> {
    const duplicateName = await this.prisma.skillCategory.findFirst({ where: { name: updateSkillCategoryDto.name } });

    if (duplicateName && duplicateName.id !== id) {
      throw new Conflict<typeof updateSkillCategoryDto>('name');
    }

    return this.prisma.skillCategory.update({ where: { id }, data: { ...updateSkillCategoryDto, updatedAt: new Date() } });
  }

  async remove(id: number): Promise<number> {
    const result = await this.prisma.skillCategory.deleteMany({ where: { id } });

    if (result.count === 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

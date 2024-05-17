import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';

@Injectable()
export class SkillCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSkillCategoryDto: CreateSkillCategoryDto) {
    return this.prisma.skillCategory.create({ data: { ...createSkillCategoryDto, createdAt: new Date() } });
  }

  findAll({ name, page, size }: NamePaginationQueryDto) {
    return this.prisma.skillCategory.findMany({ where: { name }, take: size, skip: size * page });
  }

  findOne(id: number) {
    const skillCategory = this.prisma.skillCategory.findUnique({ where: { id } });

    if (!skillCategory) {
      throw new NotFoundException();
    }

    return skillCategory;
  }

  update(id: number, updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return this.prisma.skillCategory.update({ where: { id }, data: { ...updateSkillCategoryDto, createdAt: new Date() } });
  }

  remove(id: number) {
    return this.prisma.skillCategory.delete({ where: { id } });
  }
}

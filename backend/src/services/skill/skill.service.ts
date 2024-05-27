import { Injectable } from '@nestjs/common';
import { Skill } from '@prisma/client';
import Conflict from 'src/error/Conflict';
import NotFound from 'src/error/NotFound';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateSkillDto } from 'src/services/skill/dto/create-skill.dto';
import { UpdateSkillDto } from 'src/services/skill/dto/update-skill.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { categoryId } = createSkillDto;

    const category = await this.prisma.skill.findUnique({ where: { id: categoryId } });

    if (!category) {
      throw new NotFound<typeof createSkillDto>('categoryId');
    }

    const duplicateName = await this.prisma.skill.findFirst({ where: { name: createSkillDto.name } });

    if (duplicateName) {
      throw new Conflict<typeof createSkillDto>('name');
    }

    return this.prisma.skill.create({ data: { ...createSkillDto, createdAt: new Date() } });
  }

  findAll({ name, size, page }: NamePaginationQueryDto): Promise<Skill[]> {
    return this.prisma.skill.findMany({ where: { name: { contains: name } }, take: size, skip: size * (page - 1) });
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.prisma.skill.findUnique({ where: { id } });

    if (!skill) {
      throw new NotFound('id');
    }

    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const { categoryId } = updateSkillDto;

    const category = await this.prisma.skill.findUnique({ where: { id: categoryId } });

    if (!category) {
      throw new NotFound<typeof updateSkillDto>('categoryId');
    }

    const duplicateName = await this.prisma.skill.findFirst({ where: { name: updateSkillDto.name } });

    if (duplicateName && duplicateName.id !== id) {
      throw new Conflict<typeof updateSkillDto>('name');
    }

    return this.prisma.skill.update({ where: { id }, data: { ...updateSkillDto, updatedAt: new Date() } });
  }

  async remove(id: number): Promise<number> {
    const result = await this.prisma.skill.deleteMany({ where: { id } });

    if (result.count === 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

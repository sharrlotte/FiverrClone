import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateSkillDto } from 'src/services/skill/dto/create-skill.dto';
import { UpdateSkillDto } from 'src/services/skill/dto/update-skill.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSkillDto: CreateSkillDto) {
    return this.prisma.skill.create({ data: { ...createSkillDto, createdAt: new Date() } });
  }

  findAll({ name, size, page }: NamePaginationQueryDto) {
    return this.prisma.skill.findMany({ where: { name }, take: size, skip: size * page });
  }

  findOne(id: number) {
    const skill = this.prisma.skill.findUnique({ where: { id } });

    if (!skill) {
      throw new NotFoundException();
    }

    return skill;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.prisma.skill.update({ where: { id }, data: { ...updateSkillDto, createdAt: new Date() } });
  }

  remove(id: number) {
    return this.prisma.skill.delete({ where: { id } });
  }
}

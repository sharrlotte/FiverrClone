import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto copy';
import NotFound from 'src/error/NotFound';
import Conflict from 'src/error/Conflict';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const duplicateName = await this.prisma.tag.findFirst({ where: { name: createTagDto.name } });

    if (duplicateName) {
      throw new Conflict<typeof createTagDto>('name');
    }

    return this.prisma.tag.create({ data: { ...createTagDto, createdAt: new Date() } });
  }

  findAll({ name, page, size }: NamePaginationQueryDto): Promise<Tag[]> {
    return this.prisma.tag.findMany({ where: { name }, take: size, skip: size * page });
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new NotFound('id');
    }

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const duplicateName = await this.prisma.tag.findFirst({ where: { name: updateTagDto.name } });

    if (duplicateName && duplicateName.id !== id) {
      throw new Conflict<typeof updateTagDto>('name');
    }

    return this.prisma.tag.update({ where: { id }, data: { ...updateTagDto, updatedAt: new Date() } });
  }

  async remove(id: number): Promise<number> {
    const result = await this.prisma.tag.deleteMany({ where: { id } });

    if (result.count == 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

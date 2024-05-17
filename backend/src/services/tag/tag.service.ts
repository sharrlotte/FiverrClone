import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({ data: { ...createTagDto, createdAt: new Date() } });
  }

  findAll(page: number, size: number, name: string) {
    return this.prisma.tag.findMany({ where: { name }, take: size, skip: size * page });
  }

  findOne(id: number) {
    const tag = this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({ where: { id }, data: { ...updateTagDto, createdAt: new Date() } });
  }

  remove(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}

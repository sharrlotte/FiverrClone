import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import Conflict from 'src/error/Conflict';
import NotFound from 'src/error/NotFound';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostCategoryDto: CreatePostCategoryDto) {
    const { name, parentId } = createPostCategoryDto;

    const duplicateName = await this.prisma.skillCategory.findFirst({ where: { name: name } });

    if (duplicateName) {
      throw new Conflict<typeof createPostCategoryDto>('name');
    }

    if (parentId) {
      const parentCategory = await this.prisma.category.findFirst({ where: { id: parentId } });

      if (!parentCategory) {
        throw new NotFound<typeof createPostCategoryDto>('parentId');
      }

      if (parentCategory.parentId !== null) {
        throw new BadRequestException('Children can not be parent of other children');
      }
    }

    return this.prisma.category.create({ data: { ...createPostCategoryDto, createdAt: new Date() } });
  }

  findAll({ name, size, page, isParent }: NamePaginationQueryDto & { isParent?: boolean }): Promise<Category[]> {
    name = name === '' ? undefined : name;
    let query = {};

    if (isParent === true) {
      query = { name, parentId: null };
    } else if (isParent === false) {
      query = { name, parentId: { not: null } };
    } else {
      query = { name };
    }

    return this.prisma.category.findMany({ where: query, take: size, skip: size * page });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({ where: { id } });

    if (!category) {
      throw new NotFound('id');
    }

    return category;
  }

  async update(id: number, updatePostCategoryDto: UpdatePostCategoryDto) {
    const { name, parentId } = updatePostCategoryDto;

    const duplicateName = await this.prisma.skillCategory.findFirst({ where: { name: name } });

    if (duplicateName && duplicateName.id !== id) {
      throw new Conflict<typeof updatePostCategoryDto>('name');
    }

    if (parentId) {
      const parentCategory = await this.prisma.category.findFirst({ where: { id: parentId } });

      if (!parentCategory) {
        throw new NotFound<typeof updatePostCategoryDto>('parentId');
      }

      if (parentCategory.parentId !== null) {
        throw new BadRequestException('Children can not be parent of other children');
      }
    } else {
      const children = await this.prisma.category.findFirst({ where: { parentId: id } });

      if (children !== null) {
        throw new BadRequestException('Children can not be parent of other children');
      }
    }

    return this.prisma.category.update({ where: { id }, data: { ...updatePostCategoryDto, createdAt: new Date() } });
  }

  async remove(id: number) {
    const result = await this.prisma.skill.deleteMany({ where: { id } });

    if (result.count === 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

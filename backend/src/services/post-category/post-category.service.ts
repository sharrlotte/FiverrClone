import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { NamePaginationQueryDto } from 'src/shared/dto/name-pagination-query.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import Conflict from 'src/error/Conflict';
import NotFound from 'src/error/NotFound';
import { PostCategoryResponse } from 'src/services/post-category/dto/post-category.response';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostCategoryDto: CreatePostCategoryDto) {
    const { name, parentId } = createPostCategoryDto;

    const duplicateName = await this.prisma.category.findFirst({ where: { name } });

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

  async findAll({ name, size, page, isParent }: NamePaginationQueryDto & { isParent?: boolean }): Promise<PostCategoryResponse[]> {
    name = name === '' ? undefined : name;
    let query = {};

    if (isParent === true) {
      query = { name: { contains: name }, parentId: null };
    } else if (isParent === false) {
      query = { name: { contains: name }, parentId: { not: null } };
    } else {
      query = { name: { contains: name } };
    }

    const result = await this.prisma.category.findMany({ where: query, take: size, skip: size * (page - 1), include: { parentCategory: true, childCategories: true } });

    return result.map(({ parentCategory, childCategories, ...item }) => ({ children: childCategories, parent: parentCategory, ...item }));
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
    const children = await this.prisma.category.findFirst({ where: { parentId: id } });

    if (children) {
      throw new BadRequestException('Category still have children');
    }

    const result = await this.prisma.category.deleteMany({ where: { id } });

    if (result.count === 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

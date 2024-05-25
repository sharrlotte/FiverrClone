import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import NotFound from 'src/error/NotFound';
import { SessionDto } from 'src/services/auth/dto/session.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  //Add images and more stuff to finish post
  async create(session: SessionDto, createPostDto: CreatePostDto) {
    const { packages, categories, ...createPostData } = createPostDto;

    const post = await this.prisma.post.create({
      data: {
        userId: session.id,
        ...createPostData,
        createdAt: new Date(),
      },
    });

    const savePackages = this.prisma.package.createMany({
      data: packages.map((item) => ({
        ...item,
        createdAt: new Date(),
      })),
    });

    await Promise.all(categories.map(async (category) => this.prisma.category.findFirstOrThrow({ where: { id: category, parentId: { not: null } } })));

    const saveCategories = this.prisma.postCategory.createMany({
      data: categories.map((item) => ({
        postId: post.id,
        categoryId: item,
        createdAt: new Date(),
      })),
    });

    await Promise.all([savePackages, saveCategories]);
  }

  findAll({ title, page, size }: TitlePaginationQueryDto): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { title }, take: size, skip: size * page });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFound('id');
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    const result = await this.prisma.post.deleteMany({ where: { id } });

    if (result.count === 0) {
      throw new NotFound('id');
    }

    return id;
  }
}

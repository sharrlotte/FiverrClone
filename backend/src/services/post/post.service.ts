import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import NotFound from 'src/error/NotFound';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import Conflict from 'src/error/Conflict';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //Add images and more stuff to finish post
  async create(session: SessionDto, createPostDto: CreatePostDto) {
    const { packages, categories, ...createPostData } = createPostDto;

    if (new Set(packages.map((value) => value.title)).size !== packages.length) {
      throw new Conflict<(typeof packages)[number]>('title');
    }

    if (new Set(categories).size !== categories.length) {
      throw new Conflict<typeof createPostDto>('categories');
    }

    const post = await this.prisma.post.create({
      data: {
        userId: session.id,
        ...createPostData,
        thumbnail: '',
        createdAt: new Date(),
      },
    });

    const savePackages = this.prisma.package.createMany({
      data: packages.map((item) => ({
        ...item,
        postId: post.id,
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

    return post;
  }

  async thumbnail(id: number, session: SessionDto, thumbnail: Express.Multer.File) {
    const post = await this.prisma.post.findFirst({ where: { id } });

    if (!post) {
      throw new NotFound('id');
    }

    if (post.userId !== session.id) {
      throw new ForbiddenException();
    }

    const { url } = await this.cloudinaryService.uploadImage('thumbnail', thumbnail.buffer);

    return await this.prisma.post.update({ where: { id }, data: { thumbnail: url } });
  }
  async previews(id: number, session: SessionDto, previews: Array<Express.Multer.File>) {
    const post = await this.prisma.post.findFirst({ where: { id } });

    if (!post) {
      throw new NotFound('id');
    }

    if (post.userId !== session.id) {
      throw new ForbiddenException();
    }

    const result = await Promise.all(previews.map(async (preview) => this.cloudinaryService.uploadImage('previews', preview.buffer)));

    return await this.prisma.postImage.createMany({ data: result.map(({ url }) => ({ postId: id, link: url, createdAt: new Date() })) });
  }

  findAll({ title, page, size }: TitlePaginationQueryDto): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { title: { contains: title } }, take: size, skip: size * (page - 1) });
  }
  findAllByMe({ title, page, size, userId }: TitlePaginationQueryDto & { userId: number }): Promise<Post[]> {
    return this.prisma.post.findMany({ where: { title: { contains: title }, userId }, take: size, skip: size * (page - 1) });
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

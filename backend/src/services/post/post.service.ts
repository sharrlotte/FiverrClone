import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import NotFound from 'src/error/NotFound';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import Conflict from 'src/error/Conflict';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { PostDetailResponse, PostResponse } from 'src/services/post/dto/post.response';
import { PostPaginationQueryDto } from 'src/services/post/dto/post-pagination-query.dto';
import { Post } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
    private configService: ConfigService,
  ) {}

  //Add images and more stuff to finish post
  async create(session: SessionDto, createPostDto: CreatePostDto) {
    const { packages, categories, markdownImages, images, ...createPostData } = createPostDto;

    if (new Set(packages.map((value) => value.title)).size !== packages.length) {
      throw new Conflict<(typeof packages)[number]>('title');
    }

    if (new Set(categories).size !== categories.length) {
      throw new Conflict<typeof createPostDto>('categories');
    }

    await Promise.all(categories.map(async (category) => this.prisma.category.findFirstOrThrow({ where: { id: +category, parentId: { not: null } } })));

    const imageUrls: string[] = [];

    if (images) {
      const postImageUrl = await Promise.all(images.map(async (image) => this.cloudinaryService.uploadImage('post-images', image.buffer)));
      imageUrls.push(...postImageUrl.map((item) => item.url));
    }

    if (markdownImages) {
      const postImageUrl = await Promise.all(
        markdownImages
          .filter((image) => createPostData.content.includes(image.originalName))
          .map(async (image) => {
            const filename = image.originalName;
            const publicId = this.cloudinaryService.randomPublicId();

            return this.cloudinaryService.uploadImage('post-images', image.buffer, publicId).then((result) => {
              createPostData.content = createPostData.content.replaceAll(`${this.configService.get<AppConfig>('url.frontend')}}`, '').replaceAll(filename, result.url);
              return result;
            });
          }),
      );
      imageUrls.push(...postImageUrl.map((item) => item.url));
    }

    const post = await this.prisma.post.create({
      data: {
        ...createPostData,
        userId: session.id,
        createdAt: new Date(),
        packages: {
          createMany: {
            data: packages.map((item) => ({
              ...item,
              createdAt: new Date(),
            })),
          },
        },
        postCategories: {
          createMany: {
            data: categories.map((item) => ({
              categoryId: +item,
              createdAt: new Date(),
            })),
          },
        },
        postImages: {
          createMany: {
            data: imageUrls.map((link) => ({
              link,
              createdAt: new Date(),
            })),
          },
        },
      },
    });

    return post;
  }

  async favorite(id: number, session: SessionDto) {
    try {
      this.prisma.$transaction(async (cx) => {
        const favorite = await cx.favoritePost.findFirst({ where: { postId: id, userId: session.id } });

        if (favorite) {
          await cx.post.update({ where: { id }, data: { favorites: { decrement: 1 } } });
          await cx.favoritePost.deleteMany({ where: { postId: id, userId: session.id } });
          return favorite;
        }

        await cx.post.update({ where: { id }, data: { favorites: { increment: 1 } } });
        return await cx.favoritePost.create({ data: { postId: id, userId: session.id, createdAt: new Date() } });
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
  async visit(id: number, session: SessionDto) {
    return await this.prisma.postBrowsingHistory.upsert({ where: { userId_postId: { userId: session.id, postId: id } }, create: { postId: id, userId: session.id, createdAt: new Date(), updatedAt: new Date() }, update: { updatedAt: new Date() } });
  }

  async findAll(session: SessionDto | null, { title, page, size, sort }: PostPaginationQueryDto): Promise<PostResponse[]> {
    const sortBy: keyof Post = sort ?? 'createdAt';

    if (session) {
      const result = await this.prisma.post.findMany({ where: { title: { contains: title } }, orderBy: { [sortBy]: 'desc' }, take: size, skip: size * (page - 1), include: { postImages: { select: { link: true } }, user: true, favoritePosts: { where: { userId: session.id } } } });

      return result.map(({ favoritePosts, postImages, ...data }) => ({ images: postImages.map((item) => item.link), isFavorite: favoritePosts.length > 0, ...data }));
    }

    const result = await this.prisma.post.findMany({ where: { title: { contains: title } }, orderBy: { [sortBy]: 'desc' }, take: size, skip: size * (page - 1), include: { user: true, postImages: { select: { link: true } } } });

    return result.map(({ postImages, ...data }) => ({ isFavorite: false, images: postImages.map((item) => item.link), ...data }));
  }
  async findAllByMe(session: SessionDto, { title, page, size }: PostPaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.post.findMany({ where: { title: { contains: title }, userId }, take: size, skip: size * (page - 1), include: { postImages: { select: { link: true } }, user: true, favoritePosts: { where: { userId } } } });

    return result.map(({ favoritePosts, postImages, ...data }) => ({ isFavorite: favoritePosts.length > 0, images: postImages.map((item) => item.link), ...data }));
  }
  async findAllByMeFavorite(session: SessionDto, { title, page, size }: PostPaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.post.findMany({ where: { title: { contains: title }, favoritePosts: { some: { userId } } }, take: size, skip: size * (page - 1), include: { user: true, postImages: { select: { link: true } } } });

    return result.map(({ postImages, ...data }) => ({ images: postImages.map((item) => item.link), isFavorite: true, ...data }));
  }
  async findAllByMeBrowsingHistory(session: SessionDto, { title, page, size }: PostPaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.postBrowsingHistory.findMany({ where: { post: { title: { contains: title } } }, select: { post: { include: { postImages: { select: { link: true } }, user: true, favoritePosts: { where: { userId } } } } }, take: size, skip: size * (page - 1) });

    return result.map(({ post: { postImages, ...post }, ...data }) => ({ images: postImages.map((item) => item.link), isFavorite: post.favoritePosts.length > 0, ...post, ...data }));
  }

  async findOne(id: number, session: SessionDto | null): Promise<PostDetailResponse> {
    if (session) {
      const result = await this.prisma.post.findUnique({ where: { id }, include: { postImages: { select: { link: true } }, user: true, packages: true, favoritePosts: { where: { userId: session.id } } } });

      if (!result) {
        throw new NotFound('id');
      }

      const { postImages, ...post } = result;

      return { images: postImages.map((item) => item.link), isFavorite: post.favoritePosts.length > 0, ...post };
    } else {
      const result = await this.prisma.post.findUnique({ where: { id }, include: { user: true, packages: true, postImages: { select: { link: true } } } });

      if (!result) {
        throw new NotFound('id');
      }

      const { postImages, ...post } = result;

      return { images: postImages.map((item) => item.link), isFavorite: false, ...post };
    }
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

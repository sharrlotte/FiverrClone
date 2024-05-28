import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TitlePaginationQueryDto } from 'src/services/post/dto/title-pagination-query.dto';
import NotFound from 'src/error/NotFound';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import Conflict from 'src/error/Conflict';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { PostDetailResponse, PostResponse } from 'src/services/post/dto/post.response';

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

    await Promise.all(categories.map(async (category) => this.prisma.category.findFirstOrThrow({ where: { id: category, parentId: { not: null } } })));

    const post = await this.prisma.post.create({
      data: {
        ...createPostData,
        userId: session.id,
        thumbnail: '',
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
              categoryId: item,
              createdAt: new Date(),
            })),
          },
        },
      },
    });

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

  async favorite(id: number, session: SessionDto) {
    const favorite = await this.prisma.favoritePost.findFirst({ where: { postId: id, userId: session.id } });

    if (favorite) {
      const result = await this.prisma.favoritePost.deleteMany({ where: { postId: id, userId: session.id } });

      if (result.count === 0) {
        //TODO: Status code
        throw new InternalServerErrorException();
      }
      return favorite;
    }

    return await this.prisma.favoritePost.create({ data: { postId: id, userId: session.id, createdAt: new Date() } });
  }
  async visit(id: number, session: SessionDto) {
    return await this.prisma.postBrowsingHistory.upsert({ where: { userId_postId: { userId: session.id, postId: id } }, create: { postId: id, userId: session.id, createdAt: new Date(), updatedAt: new Date() }, update: { updatedAt: new Date() } });
  }

  async findAll(session: SessionDto | null, { title, page, size }: TitlePaginationQueryDto): Promise<PostResponse[]> {
    if (session) {
      const result = await this.prisma.post.findMany({ where: { title: { contains: title } }, take: size, skip: size * (page - 1), include: { user: true, favoritePosts: { where: { userId: session.id } } } });

      return result.map(({ favoritePosts, ...data }) => ({ isFavorite: favoritePosts.length > 0, ...data }));
    }

    const result = await this.prisma.post.findMany({ where: { title: { contains: title } }, take: size, skip: size * (page - 1), include: { user: true } });

    return result.map(({ ...data }) => ({ isFavorite: false, ...data }));
  }
  async findAllByMe(session: SessionDto, { title, page, size }: TitlePaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.post.findMany({ where: { title: { contains: title }, userId }, take: size, skip: size * (page - 1), include: { user: true, favoritePosts: { where: { userId } } } });

    return result.map(({ favoritePosts, ...data }) => ({ isFavorite: favoritePosts.length > 0, ...data }));
  }
  async findAllByMeFavorite(session: SessionDto, { title, page, size }: TitlePaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.post.findMany({ where: { title: { contains: title }, userId, favoritePosts: { some: { userId } } }, take: size, skip: size * (page - 1), include: { user: true } });

    return result.map((data) => ({ isFavorite: true, ...data }));
  }
  async findAllByMeBrowsingHistory(session: SessionDto, { title, page, size }: TitlePaginationQueryDto): Promise<PostResponse[]> {
    const userId = session.id;
    const result = await this.prisma.postBrowsingHistory.findMany({ where: { post: { title: { contains: title } } }, select: { post: { include: { user: true, favoritePosts: { where: { userId } } } } }, take: size, skip: size * (page - 1) });

    return result.map(({ post, ...data }) => ({ isFavorite: post.favoritePosts.length > 0, ...post, ...data }));
  }

  async findOne(id: number, session: SessionDto | null): Promise<PostDetailResponse> {
    if (session) {
      const post = await this.prisma.post.findUnique({ where: { id }, include: { user: true, packages: true, favoritePosts: { where: { userId: session.id } } } });

      if (!post) {
        throw new NotFound('id');
      }

      return { isFavorite: post.favoritePosts.length > 0, ...post };
    } else {
      const post = await this.prisma.post.findUnique({ where: { id }, include: { user: true, packages: true } });
      if (!post) {
        throw new NotFound('id');
      }

      return { isFavorite: false, ...post };
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

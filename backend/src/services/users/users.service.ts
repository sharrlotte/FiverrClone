import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { OrderStatus, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import NotFound from 'src/error/NotFound';
import { UserProfileResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';
import { OrderPaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

type UserWithAuthoritiesAndRoles = Prisma.UserGetPayload<{}> & { roles: string[]; authorities: string[] };

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async find(providerId: string, provider: AuthProvider): Promise<UserWithAuthoritiesAndRoles | null> {
    let user = await this.prisma.account
      .findFirst({
        where: {
          provider,
          providerId,
        },
      })
      .user({
        include: {
          authorities: {
            select: {
              authority: {
                select: {
                  name: true,
                },
              },
            },
          },
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

    if (!user) {
      return null;
    }

    const roles = user.roles.map((item) => item.role.name);
    const authorities = user.authorities.map((item) => item.authority.name);

    return { ...user, roles, authorities };
  }

  async create(providerId: string, provider: AuthProvider, { username, profileUrl }: { username: string; profileUrl: string }): Promise<UserWithAuthoritiesAndRoles> {
    const role = await this.prisma.role.findFirstOrThrow({ where: { name: 'USER' } });

    const user = await this.prisma.user.create({
      data: {
        username,
        about: '',
        avatar: profileUrl,
        createdAt: new Date(),
        roles: {
          create: {
            roleId: role.id,
            createdAt: new Date(),
          },
        },
        accounts: {
          create: {
            provider,
            providerId,
            createdAt: new Date(),
          },
        },
      },
    });

    return { ...user, authorities: [], roles: [role.name] };
  }

  async get(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }

  async getProfile(id: number): Promise<UserProfileResponse> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }

  async updateProfile(id: number, session: SessionDto, updateProfileDto: UpdateProfileDto): Promise<UserProfileResponse> {
    if (session.id !== id) {
      throw new ForbiddenException();
    }

    const user = await this.prisma.user.update({ where: { id }, data: updateProfileDto });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }

  async findAllOrder(session: SessionDto, { size, page, status }: OrderPaginationQueryDto): Promise<OrderResponse[]> {
    const result = await this.prisma.order.findMany({
      where: {
        userId: session.id,
        status: {
          in: status ? (Array.isArray(status) ? status : [status]) : [],
        },
      },
      include: {
        package: true,
        user: true,
        post: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            postImages: {
              select: {
                link: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
      take: size,
      skip: size * (page - 1),
    });

    return result.map((item) => {
      const post = { ...item.post, images: item.post.postImages.map(({ link }) => link) };

      return { ...item, post };
    });
  }
}

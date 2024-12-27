import { Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { OrderStatus, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import NotFound from 'src/error/NotFound';
import { UserProfileResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';
import { OrderPaginationQueryDto, UserPaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { UpdateUserDto } from 'src/services/users/dto/user.update.dto';

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

  async findAll({ role, page, size }: UserPaginationQueryDto): Promise<UserWithAuthoritiesAndRoles[]> {
    if (!role) {
      const users = await this.prisma.user.findMany({
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
        skip: (page - 1) * size,
        take: size,
      });

      return users.map((user) => ({ ...user, roles: user.roles.map((item) => item.role.name), authorities: user.authorities.map((item) => item.authority.name) }));
    }

    const users = await this.prisma.user.findMany({
      where: {
        roles: {
          some: {
            role: {
              name: role,
            },
          },
        },
      },
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
      skip: (page - 1) * size,
      take: size,
    });

    return users.map((user) => ({ ...user, roles: user.roles.map((item) => item.role.name), authorities: user.authorities.map((item) => item.authority.name) }));
  }

  async update(id: number, update: UpdateUserDto) {
    const roles = await this.prisma.role.findMany({ where: { name: { in: update.roles } } });

    await this.prisma.userRole.deleteMany({
      where: {
        userId: id,
      },
    });
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: {
          createMany: { data: roles.map((role) => ({ roleId: role.id })) },
        },
      },
    });

    return user;
  }

  async create(providerId: string, provider: AuthProvider, { username, profileUrl, email }: { username: string; profileUrl: string; email: string }): Promise<UserWithAuthoritiesAndRoles> {
    const role = await this.prisma.role.findFirstOrThrow({ where: { name: 'USER' } });

    const user = await this.prisma.user.create({
      data: {
        username,
        about: '',
        email,
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

  async get(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        userSkill: {
          select: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFound('id');
    }

    return { ...user, skills: user.userSkill.map((v) => v.skill) };
  }

  async getProfile(id: number): Promise<UserProfileResponse> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        userSkill: {
          select: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFound('id');
    }

    return { ...user, skills: user.userSkill.map((v) => v.skill) };
  }

  async updateProfile(session: SessionDto, updateProfileDto: UpdateProfileDto): Promise<UserProfileResponse> {
    const user = await this.prisma.user.update({
      where: { id: session.id },
      data: updateProfileDto,
      include: {
        userSkill: {
          select: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFound('id');
    }

    return { ...user, skills: user.userSkill.map((v) => v.skill) };
  }

  async findAllOrder(session: SessionDto, { size, page, status }: OrderPaginationQueryDto): Promise<OrderResponse[]> {
    status = !status ? [] : Array.isArray(status) ? status : [status];

    const statusEnum = status?.map((item) => OrderStatus[item]);

    const query = statusEnum.length
      ? {
          status: {
            in: statusEnum,
          },
        }
      : {};

    const result = await this.prisma.order.findMany({
      where: {
        userId: session.id,
        ...query,
      },
      include: {
        package: true,
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
                about: true,
                welcomeMessage: true,
                userSkill: {
                  select: {
                    skill: true,
                  },
                },
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

      return { ...item, post, user: { ...item.post.user, skills: item.post.user.userSkill.map((v) => v.skill) } };
    });
  }
}

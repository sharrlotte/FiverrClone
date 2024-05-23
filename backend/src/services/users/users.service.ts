import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

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
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
        createdAt: new Date(),
      },
    });

    await this.prisma.account.create({
      data: {
        provider,
        providerId,
        userId: user.id,
        createdAt: new Date(),
      },
    });

    return { ...user, authorities: [], roles: [role.name] };
  }
}

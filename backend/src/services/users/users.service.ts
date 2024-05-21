import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async find(providerId: string, provider: AuthProvider): Promise<User | null> {
    let user = await this.prisma.account
      .findFirst({
        where: {
          provider,
          providerId,
        },
        select: {
          User: true,
        },
      })
      .User();

    return user;
  }

  async create(providerId: string, provider: AuthProvider, username: string) {
    const user = await this.prisma.user.create({
      data: {
        username,
        about: '',
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

    return user;
  }
}

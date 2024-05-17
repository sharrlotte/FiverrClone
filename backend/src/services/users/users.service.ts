import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOrCreate(providerId: string, provider: AuthProvider): Promise<User> {
    const user = await this.prisma.account
      .findFirst({
        where: {
          provider,
          providerId,
        },
        include: {
          User: true,
        },
      })
      .User();

    if (!user) throw new NotFoundException();

    return user;
  }
}

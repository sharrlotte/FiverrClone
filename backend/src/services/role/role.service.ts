import { PrismaService } from './../prisma/prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleAuthorityDto } from 'src/services/role/dto/update-role-authory';

const defaultRoles = [
  {
    id: 1,
    name: 'USER',
    description: 'User role',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'RECRUITER',
    description: 'Recruiter role',
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'CANDIDATE',
    description: 'Candidate role',
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'EMPLOYEE',
    description: 'Employee role',
    createdAt: new Date(),
  },
  {
    id: 5,
    name: 'ADMIN',
    description: 'Admin role',
    createdAt: new Date(),
  },
  {
    id: 6,
    name: 'ACCOUNT',
    description: 'Account role',
    createdAt: new Date(),
  },
];

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(private prismService: PrismaService) {}

  onModuleInit() {
    defaultRoles.forEach(async (role) => {
      await this.prismService.role.upsert({
        where: {
          name: role.name,
        },
        create: role,
        update: role,
      });
    });
  }
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return this.prismService.role
      .findMany({
        include: {
          roleAuthorities: {
            select: {
              authority: true,
            },
          },
        },
      })
      .then((items) => items.map((item) => ({ ...item, authorities: item.roleAuthorities.map((r) => r.authority) })));
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleAuthorityDto) {
    const authorities = await this.prismService.authority.findMany({ where: { name: { in: updateRoleDto.authorities.map((r) => String(r)) } } });

    await this.prismService.roleAuthority.deleteMany({
      where: {
        roleId: id,
      },
    });
    const user = await this.prismService.role.update({
      where: {
        id,
      },
      data: {
        roleAuthorities: {
          createMany: { data: updateRoleDto.authorities.map((authority) => ({ authorityId: Number(authority), createdAt: new Date() })) },
        },
      },
    });

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

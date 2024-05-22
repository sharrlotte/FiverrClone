import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

const defaultRoles = [
  {
    name: 'USER',
    description: 'User role',
    createdAt: new Date(),
  },
  {
    name: 'ADMIN',
    description: 'Admin role',
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
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}

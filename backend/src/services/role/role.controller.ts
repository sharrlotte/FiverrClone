import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { plainToInstance } from 'class-transformer';
import { RoleResponse } from 'src/services/role/dto/user-response';
import { UpdateRoleAuthorityDto } from 'src/services/role/dto/update-role-authory';
import { RoleDto } from 'src/services/role/dto/role.dto';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/shared/guard/role.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll().then((items) => items.map((item) => plainToInstance(RoleDto, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  put(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateRoleAuthorityDto) {
    return plainToInstance(RoleResponse, this.roleService.update(id, updateUserDto));
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  @UseGuards(RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}

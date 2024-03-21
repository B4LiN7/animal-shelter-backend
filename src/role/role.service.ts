import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { Permission } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    return this.prisma.role.create({
      data: dto,
    });
  }

  async getRoles() {
    return this.prisma.role.findMany();
  }

  async getRole(name: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        roleName: name,
      },
    });
    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }
    return role;
  }

  async updateRole(name: string, dto: CreateRoleDto) {
    return this.prisma.role.update({
      where: {
        roleName: name,
      },
      data: dto,
    });
  }

  async deleteRole(name: string) {
    return this.prisma.role.delete({
      where: {
        roleName: name,
      },
    });
  }

  async getPermissionsFromRole(name: string) {
    return (
      await this.prisma.role.findUnique({
        where: {
          roleName: name,
        },
        select: {
          permissions: true,
        },
      })
    ).permissions;
  }

  async addAllPermissionsToRole(name: string) {
    const allPermissions = Object.values(Permission);
    return this.prisma.role.update({
      where: {
        roleName: name,
      },
      data: {
        permissions: {
          set: allPermissions,
        },
      },
    });
  }

  async addPermissionToRole(name: string, permission: Permission) {
    return this.prisma.role.update({
      where: {
        roleName: name,
      },
      data: {
        permissions: {
          push: permission,
        },
      },
    });
  }

  async removePermissionFromRole(name: string, permission: Permission) {
    const role = await this.getRole(name);
    const updatedPermissions = role.permissions.filter((p) => p !== permission);
    return this.prisma.role.update({
      where: {
        roleName: name,
      },
      data: {
        permissions: updatedPermissions,
      },
    });
  }
}

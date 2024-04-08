import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { PermissionEnum as Permission } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  // Role CRUD
  async createRole(dto: CreateRoleDto) {
    return this.prisma.role.create({
      data: dto,
    });
  }
  async getRoles() {
    return this.prisma.role.findMany();
  }
  private async getRole(roleId: string) {
    return this.prisma.role.findUnique({
      where: {
        roleId,
      },
    });
  }
  async getRoleByName(name: string) {
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
  async updateRoleByName(name: string, dto: CreateRoleDto) {
    return this.prisma.role.update({
      where: {
        roleName: name,
      },
      data: dto,
    });
  }
  async deleteRoleByName(name: string) {
    return this.prisma.role.delete({
      where: {
        roleName: name,
      },
    });
  }

  // Permission
  async getPermissionsFromRole(roleId: string) {
    return (
      await this.prisma.role.findUnique({
        where: {
          roleId,
        },
        select: {
          permissions: true,
        },
      })
    ).permissions;
  }
  async setPermissionsToRole(roleId: string, permissions: Permission[]) {
    return this.prisma.role.update({
      where: {
        roleId,
      },
      data: {
        permissions: {
          set: permissions,
        },
      },
    });
  }
  async addPermissionToRole(roleId: string, permission: Permission) {
    return this.prisma.role.update({
      where: {
        roleId,
      },
      data: {
        permissions: {
          push: permission,
        },
      },
    });
  }
  async removePermissionFromRole(roleId: string, permission: Permission) {
    const role = await this.getRole(roleId);
    const updatedPermissions = role.permissions.filter((p) => p !== permission);
    return this.prisma.role.update({
      where: {
        roleId,
      },
      data: {
        permissions: updatedPermissions,
      },
    });
  }
  async addAllPermissionsToRole(roleId: string) {
    const allPermissions = Object.values(Permission);
    return this.prisma.role.update({
      where: {
        roleId,
      },
      data: {
        permissions: {
          set: allPermissions,
        },
      },
    });
  }
  async removeAllPermissionsFromRole(roleId: string) {
    return this.prisma.role.update({
      where: {
        roleId,
      },
      data: {
        permissions: {
          set: [],
        },
      },
    });
  }
}

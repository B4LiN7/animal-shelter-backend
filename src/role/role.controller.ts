import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

@Controller('role')
@UseGuards(AuthGuard('jwt-access-token'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(PermissionGuard)
  @Permissions(Perm.CREATE_USER)
  async getRoles() {
    return this.roleService.getRoles();
  }
}

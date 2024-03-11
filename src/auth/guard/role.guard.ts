import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { UserHelperService } from '../../user/userHelper.service';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
/**
 * Guard to check if the user is a member of the role required to access the resource.
 * If undefined (not given), the user can access the resource.
 */
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userHelper: UserHelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Role[] = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (roles === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = await this.userHelper.decodeTokenFromReq(request);

    const userRole: Role = Role[token.role];

    return roles.includes(userRole);
  }
}

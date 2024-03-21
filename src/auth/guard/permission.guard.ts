import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserHelperService } from '../../user/userHelper.service';
import { Permission } from '@prisma/client';
import { PERMISSION_KEY } from '../decorator/permisson.decorator';

@Injectable()
/**
 * Guard to check if the user is a member of the role required to access the resource.
 * If undefined (not given), the user can access the resource.
 */
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userHelper: UserHelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions: Permission[] = this.reflector.get<Permission[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (requiredPermissions === undefined) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = await this.userHelper.decodeTokenFromReq(request);
    const userPermissions = token.permissions;

    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  }
}

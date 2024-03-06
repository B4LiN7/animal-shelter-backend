import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { UserHelperService } from '../../user/userHelper.service';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
/**
 * Guard to check if the user is a member of the role required to access the resource.
 * If roles not given, it will allow access to all logged-in users.
 */
export class RoleGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    private userHelper: UserHelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Role[] = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (roles === undefined || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = await this.userHelper.getUserIdFromReq(request);

    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
      select: { role: true },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const userRole: Role = user.role;

    return roles.includes(userRole);
  }
}

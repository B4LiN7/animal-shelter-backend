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

@Injectable()
/**
 * Guard to check if the user is a member of the role required to access the resource.
 */
export class RoleGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    private userHelper: UserHelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Role[] = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const userId = await this.userHelper.getUserIdFromReq(request);

    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (roles === undefined || roles.length === 0) {
      return true;
    }

    const userRole: Role = user.role;

    return roles.includes(userRole);
  }
}

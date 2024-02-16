import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaHelperService } from 'prisma/prismaHelper.service';
import { AuthHelperService } from '../authHelper.service';
import { Role } from '@prisma/client';

/**
 * Guard to check if the user is a member of the role required to access the resource.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private prismHelper: PrismaHelperService,
    private authHelper: AuthHelperService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const userId = await this.authHelper.getUserIdFromReq(request);

    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!roles) {
      return true;
    }

    const userRole: Role = user.role;
    const neededRoles: Role[] = [];
    for (const role of roles) {
      neededRoles.push(this.prismHelper.getRoleEnum(role));
    }

    return neededRoles.includes(userRole);
  }
}

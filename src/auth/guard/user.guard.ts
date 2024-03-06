import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';
import { UserHelperService } from '../../user/userHelper.service';

@Injectable()
/**
 * Guard to check if the user is allowed to access the resource.
 * The user can access the resource if:
 * - The user is an ADMIN, or
 * - The user is the owner of the resource
 */
export class UserGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
    private logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestedUrl = request.url;
    const reqUserId = request.params.id;

    const token = await this.userHelper.decodeTokenFromReq(request);
    if (!token) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }

    if (!reqUserId) {
      this.logger.log(
        `User with ID '${token.userId}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    const userRole = await this.prisma.user.findUnique({
      where: {
        userId: token.id,
      },
      select: {
        role: true,
      },
    });
    if (userRole.role === Role.ADMIN) {
      this.logger.log(
        `User with ID '${token.userId}' is an ${userRole.role} and is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    if (token.userId === reqUserId) {
      this.logger.log(
        `User with ID '${token.userId}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    this.logger.log(
      `User with ID '${token.userId}' is not allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
    );
    return false;
  }
}

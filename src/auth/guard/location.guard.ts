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
export class LocationGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
    private logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestedUrl = request.url;
    const reqLocationId = request.params.locationId;

    const token = await this.userHelper.decodeTokenFromReq(request);
    if (!token) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }
    const userRole: Role = Role[token.role];

    if (userRole === Role.ADMIN) {
      this.logger.log(
        `User with ID '${token.userId}' is an ${userRole} and is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    const location = await this.prisma.location.findUnique({
      where: {
        locationId: Number(reqLocationId),
      },
      select: {
        userId: true,
      },
    });
    if (location.userId === token.userId) {
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

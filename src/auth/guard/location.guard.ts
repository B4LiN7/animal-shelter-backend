import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionEnum as Perm } from '@prisma/client';
import { Request } from 'express';

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
    private logger: Logger,
  ) {
    this.logger = new Logger(LocationGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const reqUrl = request.url;
    const reqLocationId = request.params.id;
    const token = request.user['decodedToken'];

    if (token.permissions.includes(Perm.ACCESS_ANY_LOCATION)) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${reqUrl} because the user have ACCESS_ANY_LOCATION permission`,
      );
      return true;
    }

    const location = await this.prisma.location.findUnique({
      where: {
        locationId: reqLocationId,
      },
      select: {
        userId: true,
      },
    });
    if (location && location.userId === token.userId) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${reqUrl} because the user the owner of it`,
      );
      return true;
    }

    this.logger.warn(
      `User with ID ${token.userId} is not allowed to access the resource ${reqUrl}`,
    );
    return false;
  }
}

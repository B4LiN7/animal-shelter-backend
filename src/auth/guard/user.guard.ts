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
    private jwt: JwtService,
    private logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestedUrl = request.url;
    const reqUserId = request.params.id;
    const reqLocationId = request.params.locationId;

    const token = request.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwt.verifyAsync(token);
    if (!decodedToken) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }

    if (!reqUserId) {
      this.logger.log(
        `User with ID '${decodedToken.id}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    const userRole = await this.prisma.user.findUnique({
      where: {
        userId: decodedToken.id,
      },
      select: {
        role: true,
      },
    });
    if (userRole.role === Role.ADMIN) {
      this.logger.log(
        `User with ID '${decodedToken.id}' is an ${userRole.role} and is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    if (decodedToken.id === reqUserId) {
      this.logger.log(
        `User with ID '${decodedToken.id}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
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
    if (location.userId === decodedToken.id) {
      this.logger.log(
        `User with ID '${decodedToken.id}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    this.logger.log(
      `User with ID '${decodedToken.id}' is not allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
    );
    return false;
  }
}

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
    const requestedId = request.params.id;

    const token = request.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwt.verifyAsync(token);
    if (!decodedToken) {
      throw new ForbiddenException('Invalid token. Please log in.');
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

    if (decodedToken.id !== requestedId) {
      this.logger.log(
        `User with ID '${decodedToken.id}' is not allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      throw new ForbiddenException('Not allowed to access the resource');
    } else {
      this.logger.log(
        `User with ID '${decodedToken.id}' is allowed to access the resource '${requestedUrl}' at ${new Date().toISOString()}`,
      );
      return true;
    }

    return false; // In theory, this line should never be reached
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';
import { UserHelperService } from 'src/user/userHelper.service';

const ALWAYS_ALLOWED_ROLES: Role[] = [Role.ADMIN];

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
  ) {
    this.logger = new Logger(LocationGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const reqUrl = request.url;
    const reqLocationId = Number.parseInt(request.params.id);
    const token = await this.userHelper.decodeTokenFromReq(request);

    if (isNaN(reqLocationId)) {
      return true;
    }

    const userRole: Role = Role[token.role];
    if (ALWAYS_ALLOWED_ROLES.includes(userRole)) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${reqUrl} because the user is a(n) ${userRole}`,
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

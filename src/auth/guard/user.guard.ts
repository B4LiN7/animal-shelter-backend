import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserHelperService } from '../../user/userHelper.service';

const ALWAYS_ALLOWED_ROLES: Role[] = [Role.ADMIN];

@Injectable()
/**
 * Guard to check if the user is allowed to access the resource.
 * The user can access the resource if:
 * - The user is an ADMIN, or
 * - The user is the owner of the resource
 */
export class UserGuard implements CanActivate {
  constructor(
    private userHelper: UserHelperService,
    private logger: Logger,
  ) {
    this.logger = new Logger(UserGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestedUrl = request.url;
    const reqUserId = request.params.id;

    const token = await this.userHelper.decodeTokenFromReq(request);

    if (!reqUserId) {
      // Disable logging this because it's too verbose
      /*
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${requestedUrl} because the resource does not require a user ID`,
      );
      */
      return true;
    }

    const userRole: Role = Role[token.role];
    if (ALWAYS_ALLOWED_ROLES.includes(userRole)) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${requestedUrl} because the user is a(n) ${userRole} `,
      );
      return true;
    }

    if (token.userId === reqUserId) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${requestedUrl} because the user is the owner of it`,
      );
      return true;
    }

    this.logger.warn(
      `User with ID ${token.userId} is not allowed to access the resource ${requestedUrl}`,
    );
    return false;
  }
}

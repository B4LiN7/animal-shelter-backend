import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { UserHelperService } from 'src/user/user-helper.service';
import { PermissionEnum as Perm } from '@prisma/client';

@Injectable()
/**
 * Guard to check if the user is allowed to access the resource.
 * The user can access the resource if:
 * - The user is an ADMIN, or
 * - The user is the owner of the resource
 */
export class UserGuard implements CanActivate {
  constructor(
    private logger: Logger,
    private userHelper: UserHelperService,
  ) {
    this.logger = new Logger(UserGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestedUrl = request.url;
    const reqUserId = request.params.id;

    const token = await this.userHelper.decodeAccessTokenFromReq(request);

    if (!reqUserId) {
      // Disable logging this because it's too verbose
      /*
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${requestedUrl} because the resource does not require a user ID`,
      );
      */
      return true;
    }

    if (token.permissions.includes(Perm.ACCESS_ANY_USER)) {
      this.logger.log(
        `User with ID ${token.userId} is allowed to access the resource ${requestedUrl} because the user have ACCESS_ANY_USER permission`,
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

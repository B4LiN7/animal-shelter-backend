import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionEnum as Permission } from '@prisma/client';

@Injectable()
/**
 * The UserHelperService provides helper functions for user-related operations
 */
export class UserHelperService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all permissions for a user
   * @param userId - The user's ID
   * @returns {Promise<Permission[]>} - A list of permissions
   */
  async getUserAllPermissions(userId: string): Promise<Permission[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId,
      },
      select: {
        role: {
          select: {
            permissions: true,
          },
        },
      },
    });

    const allRoles = userRoles.reduce((acc, userRole) => {
      return [...acc, ...userRole.role.permissions];
    }, []);
    return [...new Set(allRoles)];
  }

  /**
   * Get all roles' name for a user
   * @param userId - The user's ID
   * @returns {Promise<string[]>} - A list of roles
   */
  async getUserRoleNames(userId: string): Promise<string[]> {
    const userRole = await this.prisma.userRole.findMany({
      where: {
        userId,
      },
      select: {
        role: true,
      },
    });
    return userRole.map((userRole) => userRole.role.roleName);
  }

  /**
   * Add a role to a user
   * @param roleId - The role's ID
   * @param userId - The user's ID
   */
  async addRoleToUser(roleId: string, userId: string): Promise<void> {
    await this.prisma.userRole.create({
      data: {
        user: {
          connect: {
            userId,
          },
        },
        role: {
          connect: {
            roleId,
          },
        },
      },
    });
  }

  /**
   * Remove a role from a user
   * @param roleId - The role's ID
   * @param userId - The user's ID
   */
  async removeRoleFromUser(roleId: string, userId: string): Promise<void> {
    await this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId,
      },
    });
  }

  /**
   * Decode the access token from the request
   * @param req - The (Express) Request object
   */
  /*
  async decodeAccessTokenFromReq(req: Request): Promise<AccessTokenType> {
    const token = req.user['accessToken'];
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new ForbiddenException('Invalid token format. Please log in.');
    }

    const decodedToken = await this.jwt.verifyAsync(token);
    if (!decodedToken) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }

    return decodedToken;
  }
  */
}

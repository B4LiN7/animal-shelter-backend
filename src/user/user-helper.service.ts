import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PermissionEnum as Permission } from '@prisma/client';

@Injectable()
/**
 * The UserHelperService provides helper functions for user-related operations
 */
export class UserHelperService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

    return userRoles.reduce((acc, userRole) => {
      return [...acc, ...userRole.role.permissions];
    }, []);
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

  async decodeAccessTokenFromReq(req: Request): Promise<{
    userId: string;
    permissions: Permission[];
    iat: number;
    exp: number;
  }> {
    const token = req.user['accessToken']
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

  /**
   * Decodes a JWT token from the request object (throw an error if the token is invalid or not provided)
   * @param req - The Request object
   * @returns - The decoded JWT token
   */
  async decodeTokenFromReq(req: Request): Promise<{
    userId: string;
    permissions: Permission[];
    iat: number;
    exp: number;
  }> {
    const token = req.cookies.access_token;
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
}

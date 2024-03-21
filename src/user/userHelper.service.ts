import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Permission } from '@prisma/client';

@Injectable()
/**
 * The UserHelperService provides helper functions for authentication
 */
export class UserHelperService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   * Gets the user from the request
   * @param req The Request object
   * @returns The user
   */
  async getUserFromReq(req: Request) {
    const decodedToken = await this.decodeTokenFromReq(req);
    return this.prisma.user.findUnique({
      where: { userId: decodedToken.userId },
    });
  }

  /**
   * Decodes a JWT token from the request object (throw an error if the token is invalid or not provided)
   * @param req - The Request object
   * @returns The decoded JWT token
   */
  async decodeTokenFromReq(req: Request): Promise<{
    userId: string;
    permissions: Permission[];
    iat: number;
    exp: number;
  }> {
    const token = req.cookies.token;
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

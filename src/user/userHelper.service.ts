import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '@prisma/client';

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
   * Checks if the user is an admin
   * @param req - The Request object
   * @returns True or false, depending on whether the user is an admin
   */
  async isReqAdmin(req: Request) {
    const userId = await this.getUserIdFromReq(req);
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
      select: { role: true },
    });
    return user.role === Role.ADMIN;
  }

  /**
   * Gets the user from the request
   * @param req - The Request object
   * @returns The user
   */
  async getUserFromReq(req: Request) {
    const decodedToken = await this.decodeToken(req);
    if (!decodedToken.id) {
      throw new ForbiddenException('No user ID found in token.');
    }
    const user = await this.prisma.user.findUnique({
      where: { userId: decodedToken.id },
    });
    return user;
  }

  /**
   * Gets the user's ID from the request
   * @param req - The Request object
   * @returns The user's ID
   */
  async getUserIdFromReq(req: Request): Promise<string> {
    const decodedToken = await this.decodeToken(req);
    if (!decodedToken.id) {
      throw new ForbiddenException('No user ID found in token.');
    }
    return decodedToken.id;
  }

  /**
   * Decodes a JWT token from the request
   * @param req - The Request object
   * @returns The decoded JWT token
   */
  private async decodeToken(req: Request) {
    const token = req.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    return await this.jwt.verifyAsync(token);
  }
}

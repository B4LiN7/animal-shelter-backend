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
   * Checks if the request is from an existing user
   * @param req The Request object
   */
  async isReqExistingUser(req: Request) {
    try {
      const token = await this.decodeTokenFromReq(req);
      return await this.prisma.user.findUnique({
        where: { userId: token.userId },
      });
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if the user is an admin
   * @param req The Request object
   * @returns True or false, depending on whether the user is an admin
   */
  async isReqAdmin(req: Request) {
    const token = await this.decodeTokenFromReq(req);
    const role: Role = Role[token.role];
    return role === Role.ADMIN;
  }

  /**
   * Gets the user from the request
   * @param req The Request object
   * @returns The user
   */
  async getUserFromReq(req: Request) {
    const decodedToken = await this.decodeTokenFromReq(req);
    return await this.prisma.user.findUnique({
      where: { userId: decodedToken.userId },
    });
  }

  /**
   * Gets the user's ID from the request
   * @param req The Request object
   * @returns The user's ID
   */
  async getUserIdFromReq(req: Request): Promise<string> {
    const decodedToken = await this.decodeTokenFromReq(req);
    return decodedToken.userId;
  }

  async isTokenValidFromReq(req: Request): Promise<boolean> {
    try {
      const token = req.cookies.token;
      await this.jwt.verifyAsync(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Decodes a JWT token from the request object (throw an error if the token is invalid or not provided)
   * @param req The Request object
   * @returns The decoded JWT token
   */
  async decodeTokenFromReq(
    req: Request,
  ): Promise<{ userId: string; role: string }> {
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

    console.log('Decoded token: ', decodedToken);

    return decodedToken;
  }
}

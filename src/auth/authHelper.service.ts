import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
/**
 * The AuthHelperService provides helper functions for authentication
 */
export class AuthHelperService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   * Checks if a user exists in the database
   * @param username - The username to check (string)
   * @returns True or false, depending on whether the user exists
   */
  async isUserExists(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    return !!user;
  }

  /**
   * Checks if the user is an admin
   * @param req - The Request object
   * @returns True or false, depending on whether the user is an admin
   */
  async isAdmin(req: Request) {
    const userId = await this.getUserIdFromReq(req);
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    return user.role === Role.ADMIN;
  }

  /**
   * Gets the user's ID from the request
   * @param req - The Request object
   * @returns The user's ID
   */
  async getUserIdFromReq(req: Request) {
    const decodedToken = await this.decodeToken(req);
    if (!decodedToken.id) {
      throw new ForbiddenException('No user ID found in token.');
    }
    return decodedToken.id;
  }

  /**
   * Signs a JWT token with the user's ID (Secret is stored in .env)
   * @param id - The user's ID
   * @returns The signed JWT token
   */
  async signToken(id: string) {
    const payload = { id };
    return this.jwt.signAsync(payload);
  }

  /**
   * Decodes a JWT token from the request
   * @param req - The Request object
   * @returns The decoded JWT token
   */
  async decodeToken(req: Request) {
    const token = req.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    return await this.jwt.verifyAsync(token);
  }

  /**
   * Hashes a password using bcrypt
   * @param password - The password to hash
   * @returns The hashed password
   */
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Compares a password to a hashed password using bcrypt
   * @param password - The password to compare
   * @param hashedPassword - The hashed password to compare
   * @returns True or false, depending on whether the passwords match
   */
  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

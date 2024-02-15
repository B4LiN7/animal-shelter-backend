import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthHelperService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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
   * Compares a password to a hashed password
   * @param password - The password to compare
   * @param hashedPassword - The hashed password to compare
   */
  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Signs a JWT token with the user's ID
   * @param id - The user's ID
   * @returns The signed JWT token
   */
  async signToken(id: string) {
    const payload = { id };
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }

  /**
   * Gets the user's ID from the request
   * @param req - The request object
   * @returns The user's ID
   */
  async getUserIdFromReq(req: Request): Promise<string> {
    const decodedToken = await this.decodeToken(req);
    return decodedToken.id.toString();
  }

  /**
   * Decodes a JWT token from the request
   * @param req - The request object
   * @returns The decoded JWT token
   */
  async decodeToken(req: Request) {
    const token = req.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwt.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return decodedToken;
  }
}

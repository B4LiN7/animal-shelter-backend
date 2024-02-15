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
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async signToken(id: string) {
    const payload = { id };
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }

  async getUserIdFromReq(req: Request): Promise<string> {
    const decodedToken = await this.decodeToken(req);
    return decodedToken.id.toString();
  }

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

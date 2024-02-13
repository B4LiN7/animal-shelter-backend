import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto, req: Request, res: Response) {
    const { username, password } = dto;

    if (!username) {
      throw new BadRequestException('Username is required');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isPasswordMatch = await this.comparePassword(
      password,
      foundUser.hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken(foundUser.userId);
    if (!token) {
      throw new ForbiddenException('Token could not be generated');
    }

    res.cookie('token', token, { httpOnly: true });
    return res.send({ message: 'You have been logged in' });
  }

  async register(dto: AuthDto) {
    const { username, password, email } = dto;

    if (!username && !email) {
      throw new BadRequestException('Either username or email is required');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (foundUser) {
      throw new BadRequestException(
        `User with username ${username} already exists`,
      );
    }

    const hashedPassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: {
        userName: username ? username : email,
        email: email ? email : null,
        hashedPassword: hashedPassword,
      },
    });

    return `User with username ${username ? username : email} has been created`;
  }

  logout(req: Request, res: Response) {
    if (!req.cookies.token) {
      throw new ForbiddenException('You are not logged in');
    }
    res.clearCookie('token');
    return res.send({ message: 'You have been logged out' });
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  private async signToken(id: string) {
    const payload = { id };
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }
}

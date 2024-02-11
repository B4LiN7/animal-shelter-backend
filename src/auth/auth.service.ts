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

  // Login the user
  async login(dto: AuthDto, req: Request, res: Response) {
    //  Extract username, password, and email from the DTO
    const { username, password } = dto;

    //  Check if the user exists in the database
    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    // Check if the password matches the hashed password in the database
    const isPasswordMatch = await this.comparePassword(
      password,
      foundUser.hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    // Sign the token and send it to the client
    const token = await this.signToken(foundUser.userId);
    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    // Set the token in the cookie and send it to the client
    res.cookie('token', token, { httpOnly: true });
    return res.send({ message: 'You have been logged in' });
  }

  // Register the user
  async register(dto: AuthDto) {
    //  Extract username, password, and email from the DTO
    const { username, password, email } = dto;

    // Check if the user exists in the database
    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (foundUser) {
      throw new BadRequestException(
        `User with username ${username} already exists`,
      );
    }

    // Hash the password and create the user
    const hashedPassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: {
        userName: username,
        email: email ? email : null,
        hashedPassword: hashedPassword,
      },
    });

    return 'You have been registered';
  }

  // Logout the user
  logout(req: Request, res: Response) {
    if (!req.cookies.token) {
      throw new ForbiddenException('You are not logged in');
    }
    res.clearCookie('token');
    return res.send({ message: 'You have been logged out' });
  }

  getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { userId },
    });
  }

  // Hash the password
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  // Compare the password with the hashed password
  async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  // Sign the token using the user's ID
  async signToken(id: string) {
    const payload = { id };
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }
}

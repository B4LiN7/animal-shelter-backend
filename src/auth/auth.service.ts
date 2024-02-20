import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { AuthHelperService } from './authHelper.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authHelper: AuthHelperService,
  ) {}

  async login(dto: AuthDto, res: Response) {
    const { username, password } = dto;

    if (!username) {
      throw new BadRequestException('Username is required');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordMatch = await this.authHelper.comparePassword(
      password,
      foundUser.hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.authHelper.signTokenWithId(foundUser.userId);
    if (!token) {
      throw new ForbiddenException('Token could not be generated');
    }
    res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'You have been logged in' });
  }

  async register(dto: AuthDto) {
    const { username, password, email } = dto;
    let newUsername = username;

    if (!username && !email) {
      throw new BadRequestException('Either username or email is required');
    } else if (!username) {
      newUsername = email;
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: newUsername ? newUsername : email },
    });
    if (foundUser) {
      throw new BadRequestException(
        `User with username '${username}' already exists`,
      );
    }

    const hashedPassword = await this.authHelper.hashPassword(password);
    await this.prisma.user.create({
      data: {
        userName: newUsername,
        email: email,
        hashedPassword: hashedPassword,
      },
    });

    return { message: `User with username '${newUsername}' has been created` };
  }

  logout(req: Request, res: Response) {
    if (!req.cookies.token) {
      throw new ForbiddenException('You are not logged in');
    }
    res.clearCookie('token').json({ message: 'You have been logged out' });
  }
}

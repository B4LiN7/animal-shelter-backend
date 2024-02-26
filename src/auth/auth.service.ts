import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthHelperService } from './authHelper.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authHelper: AuthHelperService,
    private logger: Logger,
  ) {}

  /**
   * Logs in the user and sets the token cookie
   * @param dto LoginDto object containing username and password
   * @param res Response object
   */
  async login(dto: LoginDto, res: Response) {
    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: username },
    });
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordMatch = await this.authHelper.comparePasswords(
      password,
      foundUser.hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.authHelper.signToken(foundUser.userId);
    if (!token) {
      throw new ForbiddenException('Token could not be generated');
    }

    res
      .cookie('token', token, { httpOnly: true })
      .json({ message: 'You have been logged in', token: token });

    this.logger.log(`User with username '${username}' has been logged in at ${new Date()}`);
  }

  /**
   * Registers a new user
   * @param dto RegisterDto object containing username, password and email
   */
  async register(dto: RegisterDto) {
    const { username, password, email, name } = dto;
    let newUsername = username;

    if (!username && !email) {
      throw new BadRequestException('Either username or email is required');
    } else if (!username) {
      newUsername = email;
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userName: newUsername },
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
        name: name,
      },
    });

    this.logger.log(`User with username '${newUsername}' has been created at ${new Date()}`);

    return { message: `User with username '${newUsername}' has been created` };
  }

  /**
   * Logs out the user by clearing the token cookie
   * @param req Request object
   * @param res Response object
   */
  logout(req: Request, res: Response) {
    const username = this.authHelper.getUserIdFromReq(req.cookies.token);
    if (!req.cookies.token) {
      throw new ForbiddenException('You are not logged in');
    }
    res.clearCookie('token').json({ message: 'You have been logged out' });

    this.logger.log(`User with username '${username}' has been logged out at ${new Date()}`);
  }
}

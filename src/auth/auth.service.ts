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
import { UserHelperService } from '../user/userHelper.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private logger: Logger,
    private user: UserService,
    private userHelper: UserHelperService,
  ) {}

  /**
   * Logs in the user and sets the token cookie
   * @param dto LoginDto object containing username and password
   * @param res Response object
   */
  async login(dto: LoginDto, req: Request, res: Response) {
    if (req.cookies.token) {
      throw new BadRequestException('You are already logged in');
    }

    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      foundUser.hashedPassword,
    );
    if (!isPasswordMatch) {
      this.logger.log(
        `Somebody with username '${username}' has entered a wrong password at ${new Date().toISOString()} from IP address ${req.ip} and user agent '${req.headers['user-agent']}'`,
      );
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken(foundUser.userId);

    res.cookie('token', token, { httpOnly: true }).json({
      message: `You have been logged in as ${foundUser.username}`,
      token: token,
    });

    const loginHistory = await this.prisma.loginHistory.create({
      data: {
        userId: foundUser.userId,
        loginTime: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `User with username '${username}' has been logged in at ${new Date().toISOString()} from IP address ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );
  }

  /**
   * Registers a new user
   * @param dto RegisterDto object containing username, password and email
   */
  async register(dto: RegisterDto, res: Response) {
    const { username, password, email, name } = dto;
    let newUsername = username;

    if (!username && !email) {
      throw new BadRequestException('Either username or email is required');
    } else if (!username) {
      newUsername = email;
    }

    const newUser = await this.user.createUser({
      username: newUsername,
      password,
      email,
      name,
    } as CreateUserDto);

    const token = await this.signToken(newUser.userId);

    res.cookie('token', token, { httpOnly: true }).json({
      message: `User with user ID '${newUser.userId}' and username '${newUser.username}' has been created`,
      token: token,
    });
  }

  /**
   * Logs out the user by clearing the token cookie
   * @param req Request object
   * @param res Response object
   */
  async logout(req: Request, res: Response) {
    if (!req.cookies.token) {
      throw new ForbiddenException('You are not logged in');
    }
    res.clearCookie('token').json({ message: 'You have been logged out' });
    const user = await this.userHelper.getUserFromReq(req);

    this.logger.log(
      `User with user ID '${user.userId}' has been logged out using /logout at ${new Date().toISOString()}`,
    );
  }

  /**
   * Signs a JWT token with the user's ID (Secret is stored in .env)
   * @param id The user's ID
   * @returns The signed JWT token
   */
  private async signToken(id: string) {
    const payload = { id };
    const token = await this.jwt.signAsync(payload);
    if (!token) {
      throw new ForbiddenException('Token could not be generated');
    }
    return token;
  }
}

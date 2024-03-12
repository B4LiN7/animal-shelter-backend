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
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private logger: Logger,
    private user: UserService,
    private userHelper: UserHelperService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  /**
   * Logs in the user and sets the token cookie
   * @param dto - LoginDto object containing username and password
   * @param req - Request object
   * @param res - Response object
   */
  async login(dto: LoginDto, req: Request, res: Response) {
    const { username, password } = dto;

    if (await this.userHelper.isTokenValidFromReq(req)) {
      throw new BadRequestException('You are already logged in');
    }

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
        `Somebody with username '${username}' has entered a wrong password from IP address ${req.ip} and user agent '${req.headers['user-agent']}'`,
      );
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken(foundUser.userId, foundUser.role);

    const loginHistory = await this.prisma.loginHistory.create({
      data: {
        userId: foundUser.userId,
        loginTime: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `User with username '${username}' has been logged in from IP address ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.cookie('token', token, { httpOnly: true }).json({
      message: `You have been logged in as ${foundUser.username}`,
      token: token,
    });
  }

  /**
   * Registers a new user
   * @param dto - RegisterDto object containing username, password and email
   * @param req - Request object
   * @param res - Response object
   */
  async register(dto: RegisterDto, req: Request, res: Response) {
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

    const token = await this.signToken(newUser.userId, newUser.role);

    const loginHistory = await this.prisma.loginHistory.create({
      data: {
        userId: newUser.userId,
        loginTime: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `Now created user with username '${username}' has been logged in from IP address ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.cookie('token', token, { httpOnly: true }).json({
      message: `User with user ID '${newUser.userId}' and username '${newUser.username}' has been created`,
      token: token,
    });
  }

  /**
   * Logs out the user by clearing the token cookie
   * @param req - Request object
   * @param res - Response object
   */
  async logout(req: Request, res: Response) {
    res.clearCookie('token').json({ message: 'You have been logged out' });
    const user = await this.userHelper.getUserFromReq(req);

    this.logger.log(
      `User with user ID '${user.userId}' has been logged out using /logout`,
    );
  }

  /**
   * Signs a JWT token with the user's ID (Secret is stored in .env)
   * @param userId - The user's ID
   * @param role - The user's role
   * @returns The signed JWT token
   */
  private async signToken(userId: string, role: Role) {
    const payload = { userId, role };
    const token = await this.jwt.signAsync(payload);
    if (!token) {
      throw new ForbiddenException('Token could not be generated');
    }
    return token;
  }
}

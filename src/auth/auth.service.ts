import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserHelperService } from '../user/user-helper.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PermissionEnum as Permission } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private logger: Logger,
    private jwt: JwtService,
    private prisma: PrismaService,
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

    const permissions = await this.userHelper.getUserAllPermissions(
      foundUser.userId,
    );

    const tokens = await this.makeTokens(foundUser.userId, permissions);

    const loginHistory = await this.prisma.userLogin.create({
      data: {
        userId: foundUser.userId,
        refreshToken: tokens.refresh_token,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `User with username '${username}' has been logged in from IP address ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.cookie('access_token', tokens.access_token, { httpOnly: true }).json({
      message: `You have been logged in as ${foundUser.username}`,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }

  /**
   * Registers a new user
   * @param dto - RegisterDto object containing username, password and email
   * @param req - Request object
   * @param res - Response object
   */
  async register(dto: RegisterDto, req: Request, res: Response) {
    const { username, email } = dto;
    let newUsername = username;

    if (!username && !email) {
      throw new BadRequestException('Either username or email is required');
    } else if (!username) {
      newUsername = email;
    }

    delete dto.username;
    const newUser = await this.user.createUser({
      username: newUsername,
      ...dto,
    } as CreateUserDto);
    const permissions = await this.userHelper.getUserAllPermissions(
      newUser.userId,
    );
    const tokens = await this.makeTokens(newUser.userId, permissions);

    const loginHistory = await this.prisma.userLogin.create({
      data: {
        userId: newUser.userId,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `Now created user with username '${username}' has been logged in from IP address ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.cookie('access_token', tokens.access_token, { httpOnly: true }).json({
      message: `User with user ID '${newUser.userId}' and username '${newUser.username}' has been created`,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }

  /**
   * Logs out the user by clearing the token cookie
   * @param req - Request object
   * @param res - Response object
   */
  async logout(req: Request, res: Response) {
    const user = await this.getUserFromReq(req);
    res
      .clearCookie('access_token')
      .json({ message: 'You have been logged out' });

    this.logger.log(
      `User with user ID '${user.userId}' has been logged out using /logout endpoint`,
    );
  }

  /**
   * Signs access and refresh JWT token with the user's ID and the role (s)he had (Secret is stored in .env)
   * @param userId - The user's ID
   * @param permissions
   * @returns The signed JWT token
   */
  private async makeTokens(userId: string, permissions: Permission[]) {
    const payload = { userId, permissions };
    const access_token = await this.jwt.signAsync(payload, { expiresIn: '1h' });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  /**
   * Gets the user from the request
   * @param req The Request object
   */
  private async getUserFromReq(req: Request) {
    const decodedToken = await this.userHelper.decodeTokenFromReq(req);
    return this.prisma.user.findUnique({
      where: { userId: decodedToken.userId },
    });
  }
}

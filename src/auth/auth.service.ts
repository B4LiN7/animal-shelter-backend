import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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
        `Wrong password given for user '${foundUser.userId}' from IP address ${req.ip} and user agent '${req.headers['user-agent']}'`,
      );
      throw new BadRequestException('Wrong credentials');
    }

    const permissions = await this.userHelper.getUserAllPermissions(
      foundUser.userId,
    );
    const accessToken = await this.makeAccessToken(foundUser.userId, permissions);
    const refreshToken = await this.makeRefreshToken(foundUser.userId);

    const decodedRefreshToken = await this.jwt.decode(refreshToken);
    const loginHistory = await this.prisma.userLogin.create({
      data: {
        userId: foundUser.userId,
        refreshToken: refreshToken,
        expireAt: new Date(decodedRefreshToken.exp * 1000),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `User '${foundUser.userId}' logged in from IP ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.json({
      message: `You have been logged in as '${foundUser.username}' (ID: ${foundUser.userId})`,
      access_token: accessToken,
      refresh_token: refreshToken,
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

    const accessToken = await this.makeAccessToken(newUser.userId, permissions);
    const refreshToken = await this.makeRefreshToken(newUser.userId);

    const decodedRefreshToken = await this.jwt.decode(refreshToken);
    const loginHistory = await this.prisma.userLogin.create({
      data: {
        userId: newUser.userId,
        refreshToken: refreshToken,
        expireAt: new Date(decodedRefreshToken.exp),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    this.logger.log(
      `User '${newUser.userId}' created (and logged in) from IP ${loginHistory.ipAddress} and user agent '${loginHistory.userAgent}'`,
    );

    res.json({
      message: `User '${newUser.username}' (ID: ${newUser.userId}) created`,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.user['refreshToken'];
    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }

    const foundLogin = await this.prisma.userLogin.findFirst(
      {
        where: { refreshToken: refreshToken, expireAt: { gte: new Date() } },
      },
    );
    if (!foundLogin) {
      throw new BadRequestException('Refresh token not found');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { userId: foundLogin.userId },
    });
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const permissions = await this.userHelper.getUserAllPermissions(
      foundUser.userId,
    );
    const newAccessToken = await this.makeAccessToken(foundUser.userId, permissions);
    const newRefreshToken = await this.makeRefreshToken(foundUser.userId);

    const decodedNewRefreshToken = await this.jwt.decode(newRefreshToken);
    await this.prisma.userLogin.update({
      where: { userLoginId: foundLogin.userLoginId },
      data: {
        refreshToken: newRefreshToken,
        expireAt: new Date(decodedNewRefreshToken.exp * 1000),
        refreshedAt: new Date(),
      },
    });

    this.logger.log(
      `User ${foundUser.userId} refreshed their tokens from IP ${req.ip} and user agent '${req.headers['user-agent']}'`,
    );

    res.json({
      message: `Tokens refreshed for user '${foundUser.username}' (ID: ${foundUser.userId})`,
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  }

  /**
   * Logs out the user by clearing the token cookie
   * @param req - Request object
   */
  async logout(req: Request) {
    const refreshToken = req.user['refreshToken'];
    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }

    const foundLogin = await this.prisma.userLogin.deleteMany(
      {
        where: { refreshToken: refreshToken },
      },
    );
    if (foundLogin.count === 0) {
      throw new BadRequestException('Refresh token not found');
    }

    return { message: 'You have been logged out (refresh token revoked)' };
  }

  /**
   * Makes the access and refresh tokens
   * @param userId - The user's ID
   * @param permissions - The permissions of the user
   * @param expire - The expiration time of the access token (default: 15 minutes)
   * @returns The access token
   */
  private async makeAccessToken(
    userId: string,
    permissions: Permission[],
    expire: string = '15m',
  ): Promise<string> {
    const payload = { userId, permissions };
    return await this.jwt.signAsync(payload, {
      expiresIn: expire,
    });
  }

  /**
   * Makes the refresh token
   * @param userId - The user's ID
   * @param expire - The expiration time of the refresh token (default: 7 days)
   * @returns The refresh token
   */
  private async makeRefreshToken(
    userId: string,
    expire: string = '7d',
  ): Promise<string> {
    const payload = { userId };
    return await this.jwt.signAsync(payload, {
      expiresIn: expire,
    });
  }
}

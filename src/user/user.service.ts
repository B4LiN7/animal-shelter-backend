import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { UserHelperService } from 'src/user/userHelper.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
    private logger: Logger,
  ) {}

  /**
   * Get all users (for admin)
   */
  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
      },
    });
  }

  /**
   * Get user by id (for admin)
   * @param id - userId
   */
  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  /**
   * Get user who is currently logged in
   * @param req - Request object
   */
  async getMyUser(req: Request) {
    const userId = await this.userHelper.getUserIdFromReq(req);
    return await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  /**
   * Create user (for admin)
   * @param dto - CreateUserDto with user data
   */
  async createUser(dto: CreateUserDto) {
    const { username, password, email, name, role } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (foundUser) {
      this.logger.warn(
        `Somebody tried to create user with already used username '${username}'`,
      );
      throw new BadRequestException(
        `User with username '${username}' already exists`,
      );
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        hashedPassword: hashedPassword,
        name: name,
        role: role,
      },
    });

    this.logger.log(
      `User with user ID '${newUser.userId}' and username '${newUser.username}' has been created at ${new Date().toISOString()}`,
    );

    return newUser;
  }

  /**
   * Update user
   * @param id - userId
   * @param dto - UserDto with new data
   * @param req - Request object
   */
  async updateUser(id: string, dto: UserDto, req: Request) {
    if (!dto) {
      throw new BadRequestException('No data to update');
    }

    const newUser = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        email: true,
        username: true,
        hashedPassword: true,
        role: true,
        name: true,
      },
    });
    if (!newUser) {
      throw new BadRequestException('User with this ID does not exist');
    }

    if (dto.username && (await this.isUserExists(dto.username))) {
      throw new BadRequestException('User with this username already exists');
    }

    newUser.email = dto.email ?? newUser.email;
    newUser.username = dto.username ?? newUser.username;
    newUser.name = dto.name ?? newUser.name;

    if (dto.password) {
      newUser.hashedPassword = await this.hashPassword(dto.password);
    }

    if (await this.userHelper.isReqAdmin(req)) {
      newUser.role = dto.role ?? newUser.role;
    } else if (dto.role) {
      throw new BadRequestException('You are not allowed to change the role');
    }

    return await this.prisma.user.update({
      where: {
        userId: id,
      },
      data: newUser,
    });
  }

  /**
   * Delete user
   * @param id - userId
   */
  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }

  /**
   * Hashes a password using bcrypt
   * @param password - The password to hash
   * @returns The hashed password
   */
  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Checks if a user exists in the database
   * @param username - The username to check (string)
   * @returns True or false, depending on whether the user exists
   */
  private async isUserExists(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return !!user;
  }
}

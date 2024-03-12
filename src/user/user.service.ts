import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserHelperService } from 'src/user/userHelper.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
    private logger: Logger,
  ) {
    this.logger = new Logger(UserService.name);
  }

  /**
   * Get all users (for admin)
   * @returns {Promise<{userId: string, username: string, name: string, role: string}[]>} - Promise with array of users (return of Prisma findMany method)
   */
  async getAllUsers(): Promise<
    { userId: string; username: string; name: string; role: string }[]
  > {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        name: true,
        role: true,
      },
    });
  }

  /**
   * Get user by id (for admin)
   * @param id - User's ID
   * @returns {Promise<UserDto>} - Promise with user (return of Prisma findUnique method)
   */
  async getUser(id: string): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        editedAt: true,
      },
    });
  }

  /**
   * Get user's username and name by id (for admin and shelter worker)
   * @param id - User's ID
   */
  async getUserName(id: string) {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        username: true,
        name: true,
      },
    });
  }

  /**
   * Get user who is currently logged in
   * @param req - Request object
   * @returns {Promise<UserDto>} - Promise with user (return of Prisma findUnique method)
   */
  async getMyUser(req: Request): Promise<UserDto> {
    const userId = await this.userHelper.getUserIdFromReq(req);
    return this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        editedAt: true,
      },
    });
  }

  /**
   * Update user who is currently logged in
   * @param req - Request object
   * @param dto - UpdateUserDto with new data
   * @returns {Promise<UserDto>} - Promise with updated user (return of Prisma update method)
   */
  async updateMyUser(req: Request, dto: UpdateUserDto): Promise<UserDto> {
    const userId = await this.userHelper.getUserIdFromReq(req);
    return this.updateUser(userId, dto, req);
  }

  /**
   * Create user (for admin)
   * @param dto - CreateUserDto with user data
   * @returns {Promise<UserDto>} - Promise with created user (return of Prisma create method)
   */
  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const { username, password } = dto;

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
    delete dto.password;
    const newUser = await this.prisma.user.create({
      data: {
        hashedPassword: hashedPassword,
        ...dto,
      },
    });

    this.logger.log(
      `User with user ID '${newUser.userId}' and username '${newUser.username}' has been created`,
    );

    return newUser;
  }

  /**
   * Update user
   * @param id - userId
   * @param dto - UpdateUserDto with new data
   * @param req - Request object
   * @returns {Promise<UserDto>} - Promise with updated user (return of Prisma update method)
   */
  async updateUser(
    id: string,
    dto: UpdateUserDto,
    req: Request,
  ): Promise<UserDto> {
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

    if (await this.isReqAdmin(req)) {
      newUser.role = dto.role ?? newUser.role;
    } else if (dto.role) {
      throw new BadRequestException('You are not allowed to change the role');
    }

    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: newUser,
    });
  }

  /**
   * Delete user
   * @param id - User's ID
   * @returns {Promise<UserDto>} - Promise with no result
   */
  async deleteUser(id: string): Promise<UserDto> {
    return this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }

  /**
   * Hashes a password using bcrypt
   * @param password - The password to hash
   * @returns {Promise<string>} - The hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Checks if a user exists in the database
   * @param username - The username to check (string)
   * @returns {Promise<boolean>} - True if the user exists, false otherwise
   */
  private async isUserExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return !!user;
  }

  /**
   * Checks if the user is an admin
   * @param req The Request object
   * @returns True or false, depending on whether the user is an admin
   */
  private async isReqAdmin(req: Request) {
    const token = await this.userHelper.decodeTokenFromReq(req);
    const role: Role = Role[token.role];
    return role === Role.ADMIN;
  }
}

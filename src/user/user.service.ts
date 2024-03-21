import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserHelperService } from 'src/user/userHelper.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Permission as Perm } from '@prisma/client';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
    private role: RoleService,
    private logger: Logger,
  ) {
    this.logger = new Logger(UserService.name);
  }

  /**
   * Get all users (for admin)
   * @returns {Promise<any>} - Promise with array of users (return of Prisma findMany method)
   */
  async getAllUsers(): Promise<any> {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        roleName: true,
        createdAt: true,
        updatedAt: true,
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
        roleName: true,
        createdAt: true,
        updatedAt: true,
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
    const token = await this.userHelper.decodeTokenFromReq(req);
    const userId = token.userId;
    return this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        roleName: true,
        createdAt: true,
        updatedAt: true,
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
    const token = await this.userHelper.decodeTokenFromReq(req);
    const userId = token.userId;
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
        roleName: true,
        name: true,
      },
    });
    if (!newUser) {
      throw new BadRequestException('User with this ID does not exist');
    }

    if (
      dto.username &&
      (await this.isUserExists(dto.username)) &&
      newUser.username !== dto.username
    ) {
      throw new BadRequestException('User with this username already exists');
    }

    newUser.email = dto.email ?? newUser.email;
    newUser.username = dto.username ?? newUser.username;
    newUser.name = dto.name ?? newUser.name;

    if (dto.password) {
      newUser.hashedPassword = await this.hashPassword(dto.password);
    }

    const token = await this.userHelper.decodeTokenFromReq(req);
    const reqUser = await this.prisma.user.findUnique({
      where: { userId: token.userId },
    });
    const reqPerm = await this.role.getPermissionsFromRole(reqUser.roleName);
    if (reqPerm.includes(Perm.UPDATE_USER_PERMISSIONS)) {
      newUser.roleName = dto.roleName ?? newUser.roleName;
    }

    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: newUser,
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        roleName: true,
        createdAt: true,
        updatedAt: true,
      },
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
}

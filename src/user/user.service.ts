import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserHelperService } from 'src/user/user-helper.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserType } from './type/user.type';
import { PermissionEnum as Perm } from '@prisma/client';
import { RoleService } from 'src/role/role.service';
import { RoleType } from '../role/type/role.type';

const DEFAULT_ROLE_FOR_NEW_USER = 'USER';

@Injectable()
export class UserService {
  constructor(
    private logger: Logger,
    private prisma: PrismaService,
    private role: RoleService,
    private userHelper: UserHelperService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  /**
   * Get all users
   * @returns {Promise<UserType>} - Promise with array of users (return of Prisma findMany method)
   */
  async getAllUsers(): Promise<UserType[]> {
    const usersWithRoles: UserType[] = [];
    const users = await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    for (const user of users) {
      const roles = await this.userHelper.getUserRoleNames(user.userId);
      usersWithRoles.push({ ...user, roles });
    }
    return usersWithRoles;
  }

  /**
   * Get user by ID
   * @param id - User's ID
   * @returns {Promise<UserType>} - Promise with user
   */
  async getUser(id: string): Promise<UserType> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        username: true,
        name: true,
        email: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const roles = await this.userHelper.getUserRoleNames(user.userId);
    return { ...user, roles };
  }

  /**
   * Get user's username and name by ID
   * @param id - User's ID
   * @returns {Promise<{ userId: string; name: string }>} - Promise with user's ID and name
   */
  async getUserName(id: string): Promise<{ userId: string; name: string }> {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        name: true,
      },
    });
  }

  /**
   * Get user who is currently logged in
   * @param req - Request object
   * @returns {Promise<UserType>} - Promise with user
   */
  async getMyUser(req: Request): Promise<UserType> {
    const token = req.user['decodedToken'];
    const userId = token.userId;
    return this.getUser(userId);
  }

  /**
   * Update user who is currently logged in
   * @param req - Request object
   * @param dto - UpdateUserDto with new data
   * @returns {Promise<UserType>} - Promise with updated user (return of Prisma update method)
   */
  async updateMyUser(req: Request, dto: UpdateUserDto): Promise<UserType> {
    const token = req.user['decodedToken'];
    const userId = token.userId;
    return this.updateUser(userId, dto, req);
  }

  /**
   * Create user
   * @param dto - CreateUserDto with user data
   * @returns {Promise<UserType>} - Promise with created user (return of Prisma create method)
   */
  async createUser(dto: CreateUserDto): Promise<UserType> {
    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (foundUser) {
      this.logger.warn(
        `Attempt to create user with used username '${username}'`,
      );
      throw new BadRequestException(
        `User with username '${username}' already exists`,
      );
    }

    const hashedPassword = await this.hashPassword(password);

    let roles: RoleType[] = [];
    if (dto.roles) {
      roles = await Promise.all(
        dto.roles.map((role) => this.role.getRoleByName(role)),
      );
    }
    const defaultRole = await this.role.getRoleByName(
      DEFAULT_ROLE_FOR_NEW_USER,
    );
    if (!roles.includes(defaultRole)) {
      roles.push(defaultRole);
    }

    delete dto.password;
    delete dto.roles;
    const newUser = await this.prisma.user.create({
      data: {
        hashedPassword: hashedPassword,
        ...dto,
      },
    });

    await Promise.all(
      roles.map((role) =>
        this.userHelper.addRoleToUser(role.roleId, newUser.userId),
      ),
    );

    this.logger.log(
      `User ${newUser.userId} with username '${newUser.username}' has been created`,
    );

    return this.getUser(newUser.userId);
  }

  /**
   * Update user
   * @param id - userId
   * @param dto - UpdateUserDto with new data
   * @param req - Request object
   * @returns {Promise<UserType>} - Promise with updated user (return of Prisma update method)
   */
  async updateUser(
    id: string,
    dto: UpdateUserDto,
    req: Request,
  ): Promise<UserType> {
    const newUser = await this.getUser(id);

    // Check if the new username is given or already used by another user
    if (
      dto.username &&
      newUser.username !== dto.username &&
      (await this.isUsernameExists(dto.username))
    ) {
      throw new BadRequestException('User with this username already exists');
    }

    let hashedPassword: string = undefined;
    if (dto.password) {
      hashedPassword = await this.hashPassword(dto.password);
    }

    if (dto.roles) {
      const token = req.user['decodedToken'];
      if (token.permissions.includes(Perm.UPDATE_USER_ROLES)) {
        await this.setUserRoles(id, dto.roles);
      }
    }

    delete dto.password;
    delete dto.roles;
    await this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        hashedPassword: hashedPassword,
        ...dto,
      },
    });

    return this.getUser(id);
  }

  /**
   * Delete user
   * @param id - User's ID
   */
  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        userId: id,
      },
    });

    const deletedRoles = await this.deleteUserRoleConnections(id);

    return { ...deletedUser, deletedRoles: deletedRoles.count };
  }

  /**
   * Delete all user's role connections
   * @param userId - User's ID
   */
  private async deleteUserRoleConnections(userId: string) {
    return this.prisma.userRole.deleteMany({
      where: {
        userId,
      },
    });
  }

  /**
   * Set the roles for a user
   * @param userId - The user's ID
   * @param roleNames - The roles' names
   */
  private async setUserRoles(
    userId: string,
    roleNames: string[],
  ): Promise<void> {
    try {
      await Promise.all(
        roleNames.map(async (roleName) => {
          await this.prisma.role.findUnique({
            where: {
              roleName: roleName,
            },
          });
        }),
      );
    } catch (error) {
      throw new ForbiddenException('Role not found');
    }

    await this.prisma.userRole.deleteMany({
      where: {
        userId,
      },
    });

    for (const role of roleNames) {
      await this.prisma.userRole.create({
        data: {
          user: {
            connect: {
              userId,
            },
          },
          role: {
            connect: {
              roleName: role,
            },
          },
        },
      });
    }
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
   * Checks if a user exists in the database by username
   * @param username - The username to check (string)
   * @returns {Promise<boolean>} - True if the user exists, false otherwise
   */
  private async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return !!user;
  }
}

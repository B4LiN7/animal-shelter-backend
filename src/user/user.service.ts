import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { AuthHelperService } from 'src/auth/authHelper.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authHelper: AuthHelperService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
      },
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async getMyUser(req: Request) {
    const userId = await this.authHelper.getUserIdFromReq(req);
    return this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async updateUser(id: string, dto: UserDto, req: Request) {
    if (!dto) {
      throw new BadRequestException('No data to update');
    }

    const newUser = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    if (!newUser) {
      throw new BadRequestException('User with this ID does not exist');
    }

    if (dto.username && (await this.authHelper.isUserExists(dto.username))) {
      throw new BadRequestException('User with this username already exists');
    }

    newUser.email = dto.email ?? newUser.email;
    newUser.userName = dto.username ?? newUser.userName;

    if (dto.password) {
      newUser.hashedPassword = await this.authHelper.hashPassword(dto.password);
    }

    if (await this.authHelper.isAdmin(req)) {
      dto.role = dto.role ?? newUser.role;
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

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }
}

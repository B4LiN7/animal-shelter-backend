import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { UtilityService } from '../utility/utility.service';
import { UserDto } from './dto/user.dto';
import { PrismaHelperService } from '../../prisma/prismaHelper.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private prismaEnum: PrismaHelperService,
    private utility: UtilityService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
      },
    });
  }

  async getMyUser(req: Request) {
    const userId = await this.utility.getUserId(req);
    return this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
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

  async updateUser(id: string, dto: UserDto) {
    const newPassword = await this.utility.hashPassword(dto.password);
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        userName: dto.username,
        hashedPassword: newPassword,
        email: dto.email,
        role: this.prismaEnum.getRoleEnum(dto.role),
      },
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

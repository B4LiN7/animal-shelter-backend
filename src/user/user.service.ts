import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
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

  async getUser(id: string, req: Request) {
    await this.utility.validateUser(id, req);
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async updateUser(id: string, data: any) {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data,
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

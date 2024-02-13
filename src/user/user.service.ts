import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(id: string) {
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

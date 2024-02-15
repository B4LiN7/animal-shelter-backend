import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilityService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async getUserId(req: Request): Promise<string> {
    const decodedToken = await this.decodeToken(req);
    return decodedToken.id.toString();
  }

  async decodeToken(req: Request) {
    const token = req.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwt.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return decodedToken;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  tryParseId(value: string) {
    const id = parseInt(value.toString());
    if (isNaN(id)) {
      throw new BadRequestException(
        `Invalid ID format. Expected a number. Received: ${value}`,
      );
    }
    return id;
  }

  async getLatestStatusForPet(id: number) {
    const latestStatus = await this.prisma.petStatus.findFirst({
      where: { petId: id },
      orderBy: { from: 'desc' },
    });
    return latestStatus ? latestStatus.status : Status.UNKNOWN;
  }

  async deletePetById(id: number) {
    try {
      await this.prisma.petStatus.deleteMany({
        where: { petId: id },
      });
      return this.prisma.pet.delete({
        where: { petId: id },
      });
    } catch (err) {
      return 'Error while deleting pet: ' + err;
    }
  }
}

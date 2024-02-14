import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Sex, Status, Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UtilityService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser(id: string, req: Request) {
    const decodedToken = await this.decodeToken(req);
    if (decodedToken.id !== id) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }
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

  getRoleEnum(role: string) {
    let roleEnum: Role = Role.USER;
    if (!role) return roleEnum;
    role = role.toUpperCase();
    if (role in Role) {
      roleEnum = Role[role as keyof typeof Role];
    }
    return roleEnum;
  }

  getStatusEnum(status: string) {
    let statusEnum: Status = Status.UNKNOWN;
    if (!status) return statusEnum;
    status = status.toUpperCase();
    if (status in Status) {
      statusEnum = Status[status as keyof typeof Status];
    }
    return statusEnum;
  }

  getSexEnum(sex: string) {
    let sexEnum: Sex = Sex.OTHER;
    if (!sex) return sexEnum;
    sex = sex.toUpperCase();
    if (sex in Sex) {
      sexEnum = Sex[sex as keyof typeof Sex];
    }
    return sexEnum;
  }
}

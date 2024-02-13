import { BadRequestException, Injectable } from '@nestjs/common';
import { Sex, Status, Role } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UtilityService {
  constructor(private prisma: PrismaService) {}
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
    await this.prisma.petStatus.deleteMany({
      where: { petId: id },
    });
    return this.prisma.pet.delete({
      where: { petId: id },
    });
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

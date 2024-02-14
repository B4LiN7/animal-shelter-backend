import { Role, Sex, Status } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEnumService {
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

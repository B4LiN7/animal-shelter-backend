import { Role, Sex, Status } from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaHelperService {
  constructor(private prisma: PrismaService) {}

  /**
   * This function gets the Role enum from a string.
   * @param role - The role as a string.
   * @returns {Role} The role as an enum. If the role is not found, it returns Role.USER.
   */
  getRoleEnum(role: string) {
    let roleEnum: Role = Role.USER;
    if (!role) return roleEnum;
    role = role.toUpperCase();
    if (role in Role) {
      roleEnum = Role[role as keyof typeof Role];
    }
    return roleEnum;
  }

  /**
   * This function gets the Status enum from a string.
   * @param status - The status as a string.
   * @returns {Status} The status as an enum. If the status is not found, it returns Status.UNKNOWN.
   */
  getStatusEnum(status: string) {
    let statusEnum: Status = Status.UNKNOWN;
    if (!status) return statusEnum;
    status = status.toUpperCase();
    if (status in Status) {
      statusEnum = Status[status as keyof typeof Status];
    }
    return statusEnum;
  }

  /**
   * This function gets the Sex enum from a string.
   * @param sex - The sex/gender as a string.
   * @returns {Sex} The sex as an enum. If the sex is not found, it returns Sex.OTHER.
   */
  getSexEnum(sex: string) {
    let sexEnum: Sex = Sex.OTHER;
    if (!sex) return sexEnum;
    sex = sex.toUpperCase();
    if (sex in Sex) {
      sexEnum = Sex[sex as keyof typeof Sex];
    }
    return sexEnum;
  }

  /**
   * This function gets the latest status for a pet.
   * @param {number} id - The ID of the pet.
   * @returns {Promise<Status>} The latest status of the pet.
   */
  async getLatestStatusForPet(id: number) {
    const latestStatus = await this.prisma.petStatus.findFirst({
      where: { petId: id },
      orderBy: { from: 'desc' },
    });
    return latestStatus ? latestStatus.status : Status.UNKNOWN;
  }

  /**
   * This function deletes a pet by its ID.
   * @param {number} id - The ID of the pet to delete.
   * @returns {Promise<void>} A promise that resolves when the pet is deleted.
   */
  async deletePetById(id: number) {
    try {
      await this.prisma.petStatus.deleteMany({
        where: { petId: id },
      });
      return this.prisma.pet.delete({
        where: { petId: id },
      });
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to delete pet with id ${id}`,
      );
    }
  }
}

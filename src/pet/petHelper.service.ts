import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PetHelperService {
  constructor(private prisma: PrismaService) {}
  async getPetWithLatestStatus(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (!pet) {
      throw new BadRequestException('Pet not found');
    }
    const latestStatus = await this.getLatestStatusForPet(id);
    return { ...pet, status: latestStatus };
  }

  /**
   * This function gets the latest status for a pet.
   * @param {number} id - The ID of the pet.
   * @returns {Promise<Status>} The latest status of the pet.
   */
  async getLatestStatusForPet(id: number): Promise<Status> {
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
  async deletePet(id: number) {
    try {
      const deletedStatuses = await this.prisma.petStatus.deleteMany({
        where: { petId: id },
      });
      const deletedStatusesCount = deletedStatuses.count;
      const deletedPet = await this.prisma.pet.delete({
        where: { petId: id },
      });
      return { deletedPet, deletedStatusesCount };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to delete pet with id ${id}.`,
      );
    }
  }
}

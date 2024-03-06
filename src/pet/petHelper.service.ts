import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SearchPetDto } from 'src/pet/dto/searchPet.dto';

@Injectable()
export class PetHelperService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  async getPetsBySearch(search: SearchPetDto) {
    const { status, breed } = search;
    const breedId = Number(breed);
    let statusEnum;
    if (status) {
      statusEnum = Status[status.toUpperCase() as keyof typeof Status] ?? null;
    }
    const pets = await this.getPetsWithLatestStatus();
    const foundPets = pets.filter((pet) => {
      const statusMatch = statusEnum ? pet.status === statusEnum : true;
      const breedMatch = breedId ? pet.breedId === breedId : true;
      return statusMatch && breedMatch;
    });

    if (foundPets.length === 0) {
      throw new BadRequestException(
        `No pets found with the given search parameters (Status: ${statusEnum}, Breed: ${breedId})`,
      );
    }
    return foundPets;
  }

  /**
   * This function gets all pets and their latest status.
   * @returns {Promise<Pet>} The pets with the latest status.
   */
  async getPetsWithLatestStatus() {
    const pets = await this.prisma.pet.findMany();
    const petsWithLatestStatus = await Promise.all(
      pets.map(async (pet) => {
        const latestStatus = await this.getLatestStatusForPet(pet.petId);
        return { ...pet, status: latestStatus };
      }),
    );
    return petsWithLatestStatus;
  }

  /**
   * This function gets a pet and it latest status by pet's ID.
   * @param {number} id The ID of the pet to get.
   * @returns {Promise<Pet>} The pet with the latest status.
   */
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

      const deletedAdoptions = await this.prisma.adoption.deleteMany({
        where: { petId: id },
      });

      const deletedStatusesCount = deletedStatuses.count;
      const deletedPet = await this.prisma.pet.delete({
        where: { petId: id },
      });

      this.logger.log(`Pet deleted with ID '${id}'`);

      return { deletedPet, deletedStatusesCount, deletedAdoptions };
    } catch (err) {
      this.logger.error(`Failed to delete pet with ID '${id}'`, err.stack);
      throw new InternalServerErrorException(
        `Failed to delete pet with ID '${id}'`,
      );
    }
  }
}

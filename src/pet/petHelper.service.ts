import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PetSearchDto } from 'src/pet/dto/petSearch.dto';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetHelperService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  /**
   * This function gets all pets. If a search is provided, it filters the pets by the search parameters.
   * @param search The search parameters to filter the pets.
   */
  async getPetsBySearch(search: PetSearchDto) {
    const { status, breed } = search;
    const breedId = Number(breed);
    let statusEnum: Status;
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
      throw new NotFoundException(
        `No pets found with the given search parameters (Status: ${statusEnum}, Breed: ${breedId})`,
      );
    }
    return foundPets;
  }

  /**
   * This function gets all pets and their latest status.
   * @returns {Promise<PetDto[]>} The pets with the latest status.
   */
  async getPetsWithLatestStatus(): Promise<PetDto[]> {
    const pets = await this.prisma.pet.findMany();
    return await Promise.all(
      pets.map(async (pet) => {
        const latestStatus = await this.getLatestStatusForPet(pet.petId);
        return { ...pet, status: latestStatus };
      }),
    );
  }

  /**
   * This function gets a pet and it latest status by pet's ID.
   * @param {number} id - The ID of the pet to get.
   * @returns {Promise<PetDto>} The pet with the latest status.
   */
  async getPetWithLatestStatus(id: number): Promise<PetDto> {
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
   * @returns A promise that resolves when the pet is deleted.
   */
  async deletePet(id: number) {
    const deletedStatuses = await this.prisma.petStatus.deleteMany({
      where: { petId: id },
    });

    const deletedAdoptions = await this.prisma.adoption.deleteMany({
      where: { petId: id },
    });

    const deletedPet = await this.prisma.pet.delete({
      where: { petId: id },
    });

    this.logger.log(`Pet with ID ${id} deleted successfully`);

    return {
      deletedPet,
      deletedAdoptions,
      deletedStatuses: deletedStatuses.count,
    };
  }
}

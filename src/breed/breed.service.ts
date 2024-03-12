import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateBreedDto } from './dto/update.breed.dto';
import { CreateBreedDto } from './dto/create.breed.dto';
import { BreedDto } from './dto/breed.dto';

@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all breeds, If not found any, throw a NotFoundException
   * @returns {Promise<BreedDto[]>} - A promise of an array of breeds
   */
  async getAllBreeds(): Promise<BreedDto[]> {
    const breeds = await this.prisma.breed.findMany();
    if (breeds.length === 0) {
      throw new NotFoundException('No breeds found');
    }
    return breeds;
  }

  /**
   * Get a breed by ID, If not found, throw a NotFoundException
   * @param id - The ID of the breed
   * @returns {Promise<BreedDto>} - A promise of a breed
   */
  async getBreed(id: number): Promise<BreedDto> {
    const breed = await this.prisma.breed.findUnique({
      where: { breedId: id },
    });
    if (!breed) {
      throw new NotFoundException('Breed not found');
    }
    return breed;
  }

  /**
   * Add a new breed
   * @param dto - The data to create a new breed
   * @returns {Promise<BreedDto>} - The newly created breed (return of Prisma create method)
   */
  async addBreed(dto: CreateBreedDto): Promise<BreedDto> {
    return this.prisma.breed.create({
      data: {
        ...dto,
      },
    });
  }

  /**
   * Update a breed by ID, If not found, create a new breed
   * @param id - The ID of the breed
   * @param dto - The data to update the breed
   * @returns {Promise<BreedDto>} - The updated (or added) breed (return of Prisma update method)
   */
  async updateBreed(id: number, dto: UpdateBreedDto): Promise<BreedDto> {
    // If you want to create a new breed if not found, uncomment the following lines
    /*
    const existingBreed = await this.prisma.breed.findUnique({
      where: { breedId: id },
    });
    if (!existingBreed && dto.name === undefined) {
      throw new BadRequestException(
        `Breed with ID ${id} not exist, try to create, name is required`,
      );
    } else if (!existingBreed) {
      return this.addBreed(dto);
    }
    */

    return this.prisma.breed.update({
      where: { breedId: id },
      data: {
        ...dto,
      },
    });
  }

  /**
   * Delete a breed by ID
   * @param id - The ID of the breed
   * @returns {Promise<{ removedBreed: BreedDto; updatedPets: number }>} - The deleted breed (return of Prisma delete method) and the number of updated pets
   */
  async deleteBreed(
    id: number,
  ): Promise<{ removedBreed: BreedDto; updatedPets: number }> {
    const updatedPets = await this.prisma.pet.updateMany({
      where: { breedId: id },
      data: { breedId: null },
    });

    const removedBreed = await this.prisma.breed.delete({
      where: { breedId: id },
    });

    return { removedBreed, updatedPets: updatedPets.count };
  }
}

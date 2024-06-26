import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBreedDto } from './dto/update.breed.dto';
import { CreateBreedDto } from './dto/create.breed.dto';
import { BreedType } from './type/breed.type';

@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all breeds, If not found any, throw a NotFoundException
   * @returns {Promise<BreedType[]>} - A promise of an array of breeds
   */
  async getAllBreeds(): Promise<BreedType[]> {
    const breeds = await this.prisma.breed.findMany();
    /*if (breeds.length === 0) {
      throw new NotFoundException('No breeds found');
    }*/
    return breeds;
  }

  /**
   * Get a breed by ID, If not found, throw a NotFoundException
   * @param id - The ID of the breed
   * @returns {Promise<BreedType>} - A promise of a breed
   */
  async getBreed(id: string): Promise<BreedType> {
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
   * @returns {Promise<BreedType>} - The newly created breed (return of Prisma create method)
   */
  async addBreed(dto: CreateBreedDto): Promise<BreedType> {
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
   * @returns {Promise<BreedType>} - The updated (or added) breed (return of Prisma update method)
   */
  async updateBreed(id: string, dto: UpdateBreedDto): Promise<BreedType> {
    const existingBreed = await this.prisma.breed.findUnique({
      where: { breedId: id },
    });
    /* if (!existingBreed && dto.name === undefined) {
      throw new BadRequestException(
        `Breed with ID ${id} not exist, try to create, name is required`,
      );
    } else */ if (!existingBreed) {
      return this.addBreed(dto);
    }

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
   * @returns {Promise<{ removedBreed: BreedType; updatedPets: number }>} - The deleted breed (return of Prisma delete method) and the number of updated pets
   */
  async deleteBreed(
    id: string,
  ): Promise<{ removedBreed: BreedType; updatedPets: number }> {
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

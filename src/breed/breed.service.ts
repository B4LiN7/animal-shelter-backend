import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateBreedDto } from './dto/updateBreed.dto';
import { CreateBreedDto } from './dto/createBreed.dto';

@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  async getAllBreeds() {
    const breeds = await this.prisma.breed.findMany();
    if (breeds.length === 0) {
      throw new NotFoundException('No breeds found');
    }
    return breeds;
  }

  async getBreed(id: number) {
    const breed = await this.prisma.breed.findUnique({
      where: { breedId: id },
    });
    if (!breed) {
      throw new NotFoundException('Breed not found');
    }
    return breed;
  }

  async addBreed(dto: CreateBreedDto) {
    return this.addOrUpdateBreed(dto);
  }

  async updateBreed(id: number, dto: UpdateBreedDto) {
    return this.addOrUpdateBreed(dto, id);
  }

  async deleteBreed(id: number) {
    const petsWithBreed = await this.prisma.pet.findMany({
      where: { breedId: id },
    });

    for (const pet of petsWithBreed) {
      await this.prisma.pet.update({
        where: { petId: pet.petId },
        data: { breedId: null, ...pet },
      });
    }

    return this.prisma.breed.delete({
      where: { breedId: id },
    });
  }

  /**
   * Update or create a breed
   * If ID is not found or not provided, create a new breed
   * @param id Breed ID
   * @param dto Breed DTO
   * @returns Prisma response
   */
  private async addOrUpdateBreed(
    dto: UpdateBreedDto | CreateBreedDto,
    id: number = undefined,
  ) {
    if (id) {
      const breed = await this.prisma.breed.findUnique({
        where: { breedId: id },
      });
      if (breed) {
        return this.prisma.breed.update({
          where: { breedId: id },
          data: {
            ...dto,
          },
        });
      }
    }
    if (dto.name === undefined) {
      throw new NotFoundException('Name is required');
    }
    return this.prisma.breed.create({
      data: {
        ...dto,
      },
    });
  }
}

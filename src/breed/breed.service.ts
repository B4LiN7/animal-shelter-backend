import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BreedDto } from './dto/breed.dto';

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

  async addBreed(dto: BreedDto) {
    return this.addOrUpdateBreed(dto);
  }

  async updateBreed(id: number, dto: BreedDto) {
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
   * @param id Breed ID
   * @param dto Breed DTO
   * @returns Prisma response
   */
  private async addOrUpdateBreed(dto: BreedDto, id: number = -1) {
    const breed = await this.prisma.breed.findUnique({
      where: { breedId: id },
    });
    if (!breed || !id) {
      return this.prisma.breed.create({
        data: {
          name: dto.name,
          description: dto.description ? dto.description : null,
        },
      });
    }
    return this.prisma.breed.update({
      where: { breedId: id },
      data: {
        name: dto.name,
        description: dto.description ? dto.description : null,
      },
    });
  }
}

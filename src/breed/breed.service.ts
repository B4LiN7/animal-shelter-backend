import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BreedDto } from './dto/breed.dto';

@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  async getAllBreeds() {
    return this.prisma.breed.findMany();
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
    return this.prisma.breed.create({
      data: {
        name: dto.name,
        description: dto.description ? dto.description : null,
      },
    });
  }

  async updateBreed(id: number, dto: BreedDto) {
    return this.prisma.breed.update({
      where: { breedId: id },
      data: {
        name: dto.name,
        description: dto.description ? dto.description : null,
      },
    });
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
}

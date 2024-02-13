import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BreedDto } from './dto/breed.dto';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class BreedService {
  constructor(
    private prisma: PrismaService,
    private utility: UtilityService,
  ) {}

  async getAllBreeds() {
    return this.prisma.breed.findMany();
  }

  async getBreed(idStr: string) {
    const id = this.utility.tryParseId(idStr);
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

  async updateBreed(idStr: string, dto: BreedDto) {
    const id = this.utility.tryParseId(idStr);
    return this.prisma.breed.update({
      where: { breedId: id },
      data: {
        name: dto.name,
        description: dto.description ? dto.description : null,
      },
    });
  }

  async deleteBreed(idStr: string) {
    const id = this.utility.tryParseId(idStr);

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

import { Injectable, NotFoundException } from '@nestjs/common';
import { SpeciesDto } from './dto/species.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SpeciesService {
  constructor(private prisma: PrismaService) {}

  async getAllSpecies() {
    const species = await this.prisma.species.findMany();
    if (species.length === 0) {
      throw new NotFoundException('No species found');
    }
    return species;
  }

  async getSpecies(id: number) {
    const species = await this.prisma.species.findUnique({
      where: { speciesId: id },
    });
    if (!species) {
      throw new NotFoundException('Species not found');
    }
    return species;
  }

  async addSpecies(dto: SpeciesDto) {
    return await this.addOrUpdateSpecies(dto);
  }

  async updateSpecies(id: number, dto: SpeciesDto) {
    return await this.addOrUpdateSpecies(dto, id);
  }

  async deleteSpecies(id: number) {
    const breedsWithSpecies = await this.prisma.breed.findMany({
      where: { speciesId: id },
    });

    for (const breed of breedsWithSpecies) {
      await this.prisma.breed.update({
        where: { breedId: breed.breedId },
        data: { speciesId: null },
      });
    }

    return this.prisma.species.delete({
      where: { speciesId: id },
    });
  }

  /**
   * Update or create a species
   * If ID is not found or not provided, create a new species
   * @param id Species ID
   * @param dto Species DTO
   * @returns Prisma response
   */
  private async addOrUpdateSpecies(dto: SpeciesDto, id: number = undefined) {
    if (id) {
      const species = await this.prisma.species.findUnique({
        where: { speciesId: id },
      });
      if (species) {
        return this.prisma.species.update({
          where: { speciesId: id },
          data: { ...dto },
        });
      }
    }
    return this.prisma.species.create({ data: { ...dto } });
  }
}

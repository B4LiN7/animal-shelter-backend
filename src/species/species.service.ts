import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SpeciesType } from './type/species.type';
import { UpdateSpeciesDto } from './dto/update.species.dto';

@Injectable()
export class SpeciesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all species
   * @returns {Promise<SpeciesType[]>} - Array of species
   */
  async getAllSpecies(): Promise<SpeciesType[]> {
    const species = await this.prisma.species.findMany();
    /*if (species.length === 0) {
      throw new NotFoundException('No species in the database');
    }*/
    return species;
  }

  /**
   * Get a species by ID
   * @param id - Species' ID
   * @returns {Promise<SpeciesType>} - SpeciesType
   */
  async getSpecies(id: string): Promise<SpeciesType> {
    const species = await this.prisma.species.findUnique({
      where: { speciesId: id },
    });
    if (!species) {
      throw new NotFoundException('Species not found');
    }
    return species;
  }

  /**
   * Create a new species
   * @param dto - SpeciesType DTO
   * @returns {Promise<SpeciesType>} - The created species (return of Prisma create method)
   */
  async addSpecies(dto: CreateSpeciesDto): Promise<SpeciesType> {
    return this.prisma.species.create({ data: { ...dto } });
  }

  /**
   * Update a species, If the species does not exist, create a new one
   * @param id - Species' ID
   * @param dto - Species data
   * @returns {Promise<SpeciesType>} - The updated species (return of Prisma update method)
   */
  async updateSpecies(id: string, dto: UpdateSpeciesDto): Promise<SpeciesType> {
    const existingSpecies = await this.prisma.species.findUnique({
      where: { speciesId: id },
    });
    /* if (!existingSpecies && dto.name === undefined) {
      throw new BadRequestException(
        `Species with ID ${id} not exist, try to create, name is required`,
      );
    } else */ if (!existingSpecies) {
      return this.addSpecies(dto);
    }

    return this.prisma.species.update({
      where: { speciesId: id },
      data: { ...dto },
    });
  }

  /**
   * Delete a species
   * @param id - Species' ID
   * @returns {Promise<{ removedSpecies: SpeciesType; updatedBreeds: number }>} - The deleted species (return of Prisma delete method) and the number of updated breeds
   */
  async deleteSpecies(
    id: string,
  ): Promise<{ removedSpecies: SpeciesType; updatedBreeds: number }> {
    const updatedBreeds = await this.prisma.breed.updateMany({
      where: { breedId: id },
      data: { speciesId: null },
    });

    const removedSpecies = await this.prisma.species.delete({
      where: { speciesId: id },
    });

    return { removedSpecies, updatedBreeds: updatedBreeds.count };
  }
}

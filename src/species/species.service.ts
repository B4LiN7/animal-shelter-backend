import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpeciesDto } from './dto/createSpecies.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SpeciesDto } from './dto/species.dto';
import { UpdateSpeciesDto } from './dto/updateSpecies.dto';

@Injectable()
export class SpeciesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all species
   * @returns {Promise<SpeciesDto[]>} - Array of species
   */
  async getAllSpecies(): Promise<SpeciesDto[]> {
    const species = await this.prisma.species.findMany();
    if (species.length === 0) {
      throw new NotFoundException('No species found');
    }
    return species;
  }

  /**
   * Get a species by ID
   * @param id - SpeciesDto ID
   * @returns {Promise<SpeciesDto>} - SpeciesDto
   */
  async getSpecies(id: number): Promise<SpeciesDto> {
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
   * @param dto - SpeciesDto DTO
   * @returns {Promise<SpeciesDto>} - The created species (return of Prisma create method)
   */
  async addSpecies(dto: CreateSpeciesDto): Promise<SpeciesDto> {
    return this.prisma.species.create({ data: { ...dto } });
  }

  /**
   * Update a species, If the species does not exist, create a new one
   * @param id - SpeciesDto ID
   * @param dto - SpeciesDto DTO
   * @returns {Promise<SpeciesDto>} - The updated species (return of Prisma update method)
   */
  async updateSpecies(id: number, dto: UpdateSpeciesDto): Promise<SpeciesDto> {
    const existingSpecies = await this.prisma.species.findUnique({
      where: { speciesId: id },
    });
    if (!existingSpecies && dto.name === undefined) {
      throw new BadRequestException(
        `Species with ID ${id} not exist, try to create, name is required`,
      );
    } else if (!existingSpecies) {
      return this.addSpecies(dto);
    }

    return this.prisma.species.update({
      where: { speciesId: id },
      data: { ...dto },
    });
  }

  /**
   * Delete a species
   * @param id - SpeciesDto ID
   * @returns {Promise<SpeciesDto>} - The deleted species (return of Prisma delete method)
   */
  async deleteSpecies(id: number): Promise<SpeciesDto> {
    await this.prisma.breed.update({
      where: { breedId: id },
      data: { speciesId: null },
    });

    return this.prisma.species.delete({
      where: { speciesId: id },
    });
  }
}

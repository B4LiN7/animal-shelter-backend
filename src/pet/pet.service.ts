import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePetDto } from './dto/createPet.dto';
import { UpdatePetDto } from './dto/updatePet.dto';
import { PetHelperService } from './petHelper.service';
import { SearchPetDto } from './dto/searchPet.dto';
import { PetDto } from './dto/pet.dto';
import { PetStatusDto } from './dto/petStatus.dto';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
  ) {}

  /**
   * Get all pets
   * @param search - Search parameters (optional)
   * @returns {Promise<PetDto[]>} - List of pets
   */
  async getAllPets(search?: SearchPetDto): Promise<PetDto[]> {
    if (search) {
      const foundPets = await this.petHelper.getPetsBySearch(search);
      return Promise.all(
        foundPets.map(async (pet) => {
          return await this.petHelper.getPetWithLatestStatus(pet.petId);
        }),
      );
    }
    return await this.petHelper.getPetsWithLatestStatus();
  }

  /**
   * Get a pet by ID
   * @param id - Pet's ID
   * @returns {Promise<PetDto>} - The pet with the given ID
   */
  async getPet(id: number): Promise<PetDto> {
    return await this.petHelper.getPetWithLatestStatus(id);
  }

  /**
   * Create a new pet
   * @param dto - New pet data
   * @returns {Promise<PetDto>} - The newly created pet
   */
  async createPet(dto: CreatePetDto): Promise<PetDto> {
    const { status, ...newPet } = dto;

    const breedId = newPet.breedId;
    const breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${breedId} does not exist`);
    }

    const pet = await this.prisma.pet.create({
      data: {
        ...newPet,
      },
    });

    await this.prisma.petStatus.create({
      data: {
        petId: pet.petId,
        status: status,
      },
    });

    return await this.petHelper.getPetWithLatestStatus(pet.petId);
  }

  /**
   * Update a pet
   * @param id - Pet's ID
   * @param dto - New pet data
   * @returns {Promise<PetDto>} - The updated pet
   */
  async updatePet(id: number, dto: UpdatePetDto): Promise<PetDto> {
    const { status, ...newPet } = dto;

    const existingPet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (
      !existingPet &&
      (newPet.breedId === undefined ||
        newPet.birthDate === undefined ||
        newPet.sex === undefined)
    ) {
      throw new BadRequestException(
        `Pet with ID ${id} does not exist, try to create a new pet, breedId or/and birthDate is missing`,
      );
    } else if (!existingPet) {
      return await this.createPet(dto);
    }

    await this.prisma.pet.update({
      where: { petId: id },
      data: {
        ...newPet,
      },
    });

    if (status) {
      await this.prisma.petStatus.create({
        data: {
          petId: id,
          status: status,
        },
      });
    }

    return await this.petHelper.getPetWithLatestStatus(id);
  }

  /**
   * Delete a pet
   * @param id - Pet's ID
   * @returns The deleted pet, adoptions and statuses
   */
  async deletePet(id: number) {
    return await this.petHelper.deletePet(id);
  }

  /**
   * Get the status history of a pet
   * @param id - Pet's ID
   * @returns {Promise<PetStatusDto[]>} - The status history of the pet
   */
  async getPetStatus(id: number): Promise<PetStatusDto[]> {
    return this.prisma.petStatus.findMany({
      where: { petId: id },
      orderBy: { from: 'desc' },
      select: {
        petId: true,
        status: true,
        from: true,
      },
    });
  }
}

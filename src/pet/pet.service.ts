import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create.pet.dto';
import { UpdatePetDto } from './dto/update.pet.dto';
import { PetHelperService } from './pet-helper.service';
import { SearchPetDto } from './dto/search.pet.dto';
import { PetType } from './type/pet.type';
import { PetStatusType } from './type/pet-status.type';
import {
  AdoptionStatusEnum as AdoptionStatus,
  PetStatusEnum as Status,
} from '@prisma/client';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
  ) {}

  /**
   * Get all pets
   * @param search - Search parameters (optional)
   * @returns {Promise<PetType[]>} - List of pets
   */
  async getAllPets(search?: SearchPetDto): Promise<PetType[]> {
    if (search) {
      return await this.petHelper.getPetsBySearch(search);
    }
    return await this.petHelper.getPetsWithLatestStatus();
  }

  /**
   * Get a pet by ID
   * @param id - Pet's ID
   * @returns {Promise<PetType>} - The pet with the given ID
   */
  async getPet(id: string): Promise<PetType> {
    return await this.petHelper.getPetWithLatestStatus(id);
  }

  /**
   * Create a new pet
   * @param dto - New pet data
   * @returns {Promise<PetType>} - The newly created pet
   */
  async createPet(dto: CreatePetDto): Promise<PetType> {
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
   * @returns {Promise<PetType>} - The updated pet
   */
  async updatePet(id: string, dto: UpdatePetDto): Promise<PetType> {
    const { status, ...pet } = dto;

    const existingPet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (
      !existingPet &&
      (pet.breedId === undefined ||
        pet.birthDate === undefined ||
        pet.sex === undefined)
    ) {
      throw new BadRequestException(
        `Pet with ID ${id} does not exist, try to create a new pet, breedId or/and birthDate is missing`,
      );
    } else if (!existingPet) {
      return await this.createPet(dto);
    }

    const petAdoptions = await this.prisma.adoption.findMany({
      where: {
        petId: id,
        status: { in: [AdoptionStatus.PENDING, AdoptionStatus.APPROVED] },
      },
    });
    const runningAdoptionForPet = petAdoptions.find(
      (adoption) => adoption.status === AdoptionStatus.PENDING,
    );
    const adoptedPet = petAdoptions.find(
      (adoption) => adoption.status === AdoptionStatus.APPROVED,
    );

    if (
      runningAdoptionForPet &&
      (status === Status.ILL || status === Status.DECEASED)
    ) {
      await this.prisma.adoption.update({
        where: { adoptionId: runningAdoptionForPet.adoptionId },
        data: {
          status: AdoptionStatus.REJECTED,
          reason: `The adoption automatically rejected because '${existingPet?.name}' is ${status}.`,
        },
      });
    }
    if (adoptedPet && status !== Status.ADOPTED) {
      throw new BadRequestException(
        `Pet with ID ${id} has been adopted, to modify status change or delete the adoption status first.`,
      );
    }

    await this.prisma.pet.update({
      where: { petId: id },
      data: {
        ...pet,
      },
    });

    if (status) {
      const latestStatus = await this.prisma.petStatus.findFirst({
        where: { petId: id },
        orderBy: { from: 'desc' },
      });
      if (latestStatus.status !== status) {
        await this.prisma.petStatus.create({
          data: {
            petId: id,
            status: status,
          },
        });
      }
    }

    return await this.petHelper.getPetWithLatestStatus(id);
  }

  /**
   * Delete a pet
   * @param id - Pet's ID
   * @returns The deleted pet, adoptions and statuses
   */
  async deletePet(id: string) {
    return await this.petHelper.deletePet(id);
  }

  /**
   * Get the status history of a pet
   * @param id - Pet's ID
   * @returns {Promise<PetStatusType[]>} - The status history of the pet
   */
  async getPetStatus(id: string): Promise<PetStatusType[]> {
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

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddPetDto } from './dto/addPet.dto';
import { EditPetDto } from './dto/editPet.dto';
import { Sex, Status } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // Add pet to the database
  async addPet(dto: AddPetDto) {
    const { name, sex, breedId, status } = dto;
    const sexEnum: Sex = this.getSexEnum(sex);

    // Check if breed exists
    const breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });
    if (!breed) {
      throw new Error('Breed does not exist');
    }

    const pet = await this.prisma.pet.create({
      data: {
        name: name ? name : null,
        sex: sexEnum,
        breedId,
      },
    });

    const statusEnum: Status = await this.getStatusEnum(status);

    await this.prisma.petStatus.create({
      data: {
        status: statusEnum,
        petId: pet.petId,
      },
    });

    return pet;
  }

  // Update pet status
  async updatePet(dto: EditPetDto) {
    const { id, name, sex, breedId, status } = dto;

    if (!id) throw new BadRequestException('Pet ID is required');

    const statusEnum: Status = this.getStatusEnum(status);
    const sexEnum: Sex = this.getSexEnum(sex);

    await this.prisma.petStatus.create({
      data: {
        status: statusEnum,
        petId: id,
      },
    });

    const updatedPet = await this.getPetById(id);
    if (sex) updatedPet.sex = sexEnum;
    if (name) updatedPet.name = name;
    if (breedId) updatedPet.breedId = breedId;

    return this.prisma.pet.update({
      where: { petId: id },
      data: updatedPet,
    });
  }

  // Get all pets from the database
  async getAllPets() {
    const pets = await this.prisma.pet.findMany();
    const petsWithLatestStatus = await Promise.all(
      pets.map(async (pet) => {
        const status = await this.getLatestStatusForPet(pet.petId);
        return { ...pet, status };
      }),
    );
    return petsWithLatestStatus;
  }

  async getPet(id: number) {
    id = Number(id);
    const pet = this.getPetById(id);
    if (!pet) throw new BadRequestException('Pet not found');
    const latestStatus = await this.getLatestStatusForPet(id);
    return { ...pet, latestStatus };
  }

  async deletePet(id: number) {
    id = Number(id);
    return this.deletePetById(id);
  }

  /*
   Helper functions:
    - deletePetById, getPetById, getLatestStatusForPet, getStatusEnum, getSexEnum
  */

  private async deletePetById(id: number) {
    // Delete associated PetStatus records
    await this.prisma.petStatus.deleteMany({
      where: { petId: id },
    });
    // Delete the Pet
    return this.prisma.pet.delete({
      where: { petId: id },
    });
  }

  private async getPetById(id: number) {
    return await this.prisma.pet.findUnique({
      where: { petId: id },
    });
  }

  private async getLatestStatusForPet(id: number) {
    const latestStatus = await this.prisma.petStatus.findFirst({
      where: { petId: id },
      orderBy: { from: 'desc' },
    });
    return latestStatus ? latestStatus.status : Status.UNKNOWN;
  }

  private getStatusEnum(status: string) {
    let statusEnum: Status = Status.UNKNOWN;
    status = status.toUpperCase();
    if (status in Status) {
      statusEnum = Status[status as keyof typeof Status];
    }
    return statusEnum;
  }

  private getSexEnum(sex: string) {
    let sexEnum: Sex = Sex.OTHER;
    sex = sex.toUpperCase();
    if (sex in Sex) {
      sexEnum = Sex[sex as keyof typeof Sex];
    }
    return sexEnum;
  }
}

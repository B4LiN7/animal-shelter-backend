import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Sex, Status } from '@prisma/client';
import { PetDto } from './dto/pet.dto';
import { PetHelperService } from './petHelper.service';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
  ) {}

  async createPet(dto: PetDto) {
    const { name, sex, breedId, status, description, birthDate, imageUrl } =
      dto;

    const breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });
    if (!breed) {
      throw new NotFoundException('Breed does not exist');
    }

    const pet = await this.prisma.pet.create({
      data: {
        name: name ?? null,
        description: description ?? null,
        birthDate: birthDate ?? null,
        imageUrl: imageUrl ?? null,
        sex: sex ?? Sex.OTHER,
        breedId,
      },
    });

    await this.prisma.petStatus.create({
      data: {
        status: status ?? Status.UNKNOWN,
        petId: pet.petId,
      },
    });

    return await this.petHelper.getPetWithLatestStatus(pet.petId);
  }

  async readAllPets() {
    const pets = await this.prisma.pet.findMany();
    if (pets.length === 0) {
      throw new BadRequestException('No pets found');
    }
    return await Promise.all(
      pets.map(async (pet) => {
        return await this.petHelper.getPetWithLatestStatus(pet.petId);
      }),
    );
  }

  async readPet(id: number) {
    if (!id) throw new BadRequestException('Pet ID is required');
    return await this.petHelper.getPetWithLatestStatus(id);
  }

  async updatePet(id: number, dto: PetDto) {
    if (!id) throw new BadRequestException('Pet ID is required');
    const { name, sex, breedId, status } = dto;

    await this.prisma.petStatus.create({
      data: {
        status: status ?? Status.UNKNOWN,
        petId: id,
      },
    });

    return this.prisma.pet.update({
      where: { petId: id },
      data: {
        name: name,
        sex: sex,
        breedId: breedId,
      },
    });
  }

  async deletePet(id: number) {
    return await this.petHelper.deletePet(id);
  }

  async readPetStatus(id: number) {
    return this.prisma.petStatus.findMany({
      where: { petId: id },
    });
  }
}

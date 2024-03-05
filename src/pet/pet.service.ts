import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Sex, Status } from '@prisma/client';
import { CreatePetDto } from './dto/createPet.dto';
import { UpdatePetDto } from './dto/updatePet.dto';
import { PetHelperService } from './petHelper.service';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
  ) {}

  async createPet(dto: CreatePetDto) {
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
        name: name ?? undefined,
        description: description ?? undefined,
        imageUrl: imageUrl ?? undefined,
        birthDate: birthDate ?? undefined,
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

  async getAllPets() {
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

  async getPet(id: number) {
    if (!id) throw new BadRequestException('Pet ID is required');
    return await this.petHelper.getPetWithLatestStatus(id);
  }

  async updatePet(id: number, dto: UpdatePetDto) {
    if (!id) throw new BadRequestException('Pet ID is required');
    const { status } = dto;

    await this.prisma.pet.update({
      where: { petId: id },
      data: {
        ...dto,
      },
    });

    if (status) {
      await this.prisma.petStatus.create({
        data: {
          status: status,
          petId: id,
        },
      });
    }

    return await this.petHelper.getPetWithLatestStatus(id);
  }

  async deletePet(id: number) {
    return await this.petHelper.deletePet(id);
  }

  async getPetStatus(id: number) {
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

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PetDto } from './dto/pet.dto';
import { Sex, Status } from '@prisma/client';
import { PrismaHelperService } from '../../prisma/prismaHelper.service';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private prismaHelper: PrismaHelperService,
  ) {}

  async addPet(dto: PetDto) {
    const { name, sex, breedId, status, description, birthDate, imageUrl } =
      dto;

    const breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });
    if (!breed) {
      throw new NotFoundException('Breed does not exist');
    }

    const sexEnum: Sex = this.prismaHelper.getSexEnum(sex);
    const pet = await this.prisma.pet.create({
      data: {
        name: name ? name : null,
        description: description ? description : null,
        birthDate: birthDate ? birthDate : null,
        imageUrl: imageUrl ? imageUrl : null,
        sex: sexEnum,
        breedId,
      },
    });

    const statusEnum: Status = await this.prismaHelper.getStatusEnum(status);
    await this.prisma.petStatus.create({
      data: {
        status: statusEnum,
        petId: pet.petId,
      },
    });

    return pet;
  }

  async getAllPets() {
    const pets = await this.prisma.pet.findMany();
    return await Promise.all(
      pets.map(async (pet) => {
        const status = await this.prismaHelper.getLatestStatusForPet(pet.petId);
        return { ...pet, status };
      }),
    );
  }

  async getPet(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (!pet) throw new BadRequestException('Pet not found');
    const latestStatus = await this.prismaHelper.getLatestStatusForPet(
      pet.petId,
    );
    return { ...pet, latestStatus };
  }

  async updatePet(id: number, dto: PetDto) {
    const { name, sex, breedId, status } = dto;

    if (!id) throw new BadRequestException('Pet ID is required');

    const statusEnum: Status = this.prismaHelper.getStatusEnum(status);
    const sexEnum: Sex = this.prismaHelper.getSexEnum(sex);

    await this.prisma.petStatus.create({
      data: {
        status: statusEnum,
        petId: id,
      },
    });

    const updatedPet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (sex) updatedPet.sex = sexEnum;
    if (name) updatedPet.name = name;
    if (breedId) updatedPet.breedId = breedId;

    return this.prisma.pet.update({
      where: { petId: id },
      data: updatedPet,
    });
  }

  async deletePet(id: number) {
    return this.prismaHelper.deletePetById(id);
  }
}

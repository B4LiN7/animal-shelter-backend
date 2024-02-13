import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PetDto } from './dto/pet.dto';
import { Sex, Status } from '@prisma/client';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private utility: UtilityService,
  ) {}

  async addPet(dto: PetDto) {
    const { name, sex, breedId, status } = dto;
    const sexEnum: Sex = this.utility.getSexEnum(sex);

    const breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });
    if (!breed) {
      throw new NotFoundException('Breed does not exist');
    }

    const pet = await this.prisma.pet.create({
      data: {
        name: name ? name : null,
        sex: sexEnum,
        breedId,
      },
    });

    const statusEnum: Status = await this.utility.getStatusEnum(status);
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
        const status = await this.utility.getLatestStatusForPet(pet.petId);
        return { ...pet, status };
      }),
    );
  }

  async getPet(idStr: string) {
    const id = this.utility.tryParseId(idStr);
    const pet = await this.prisma.pet.findUnique({
      where: { petId: id },
    });
    if (!pet) throw new BadRequestException('Pet not found');
    const latestStatus = await this.utility.getLatestStatusForPet(pet.petId);
    return { ...pet, latestStatus };
  }

  async updatePet(idStr: string, dto: PetDto) {
    const { name, sex, breedId, status } = dto;
    const id = this.utility.tryParseId(idStr);

    if (!id) throw new BadRequestException('Pet ID is required');

    const statusEnum: Status = this.utility.getStatusEnum(status);
    const sexEnum: Sex = this.utility.getSexEnum(sex);

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

  async deletePet(idStr: string) {
    const id = this.utility.tryParseId(idStr);
    return this.utility.deletePetById(id);
  }
}

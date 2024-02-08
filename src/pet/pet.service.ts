import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PetDto } from './dto/pet.dto';
import { Sex, Status } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  // Add pet to the database
  async addPet(dto: PetDto) {
    const { name, sex, breedId, status } = dto;

    let sexEnum: Sex = Sex.OTHER;
    if (sex in Sex) {
      sexEnum = Sex[sex as keyof typeof Sex];
    }

    // Check if breed exists
    let breed = await this.prisma.breed.findUnique({
      where: { breedId },
    });

    const pet = await this.prisma.pet.create({
      data: {
        name: name ? name : null,
        sex: sexEnum,
        breedId,
      },
    });

    if (status) {
      let statusEnum: Status = Status.UNKNOWN;
      if (status in Status) {
        statusEnum = Status[status as keyof typeof Status];
      }

      await this.prisma.petStatus.create({
        data: {
          newStatus: statusEnum,
          petId: pet.petId,
        },
      });
    } else {
      await this.prisma.petStatus.create({
        data: {
          newStatus: Status.UNKNOWN,
          petId: pet.petId,
        },
      });
    }

    return pet;
  }

}

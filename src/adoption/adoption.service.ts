import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UtilityService } from 'src/utility/utility.service';
import { Request } from 'express';
import { Status } from '@prisma/client';
import { AdoptionDto } from './dto/adoption.dto';

@Injectable()
export class AdoptionService {
  constructor(
    private prisma: PrismaService,
    private utility: UtilityService,
  ) {}

  async startAdoptionProcess(petIdStr: string, req: Request) {
    const petId = await this.utility.tryParseId(petIdStr);

    const decodeToken = await this.utility.decodeToken(req);
    if (!decodeToken) {
      throw new Error('User not authenticated');
    }

    const pet = await this.prisma.pet.findUnique({
      where: { petId: petId },
    });
    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    this.setAdoptionStatus(decodeToken.userId, petId, true);

    return;
  }

  async finishAdoptionProcess(petIdStr: string, req: Request) {
    const petId = await this.utility.tryParseId(petIdStr);
  }

  async addAdoption(dto: AdoptionDto) {
    return 'This action adds a new adoption';
  }

  async getAdoption(id: number) {
    return 'This action returns a #${id} adoption';
  }

  async updateAdoption(id: number, dto: AdoptionDto) {
    return 'This action updates a #${id} adoption';
  }

  async deleteAdoption(id: number) {
    return 'This action removes a #${id} adoption';
  }

  private async getAdoptionStatus(id: number) {}

  private async setAdoptionStatus(
    userId: string,
    petId: number,
    isOngoing: boolean,
  ) {
    const status = isOngoing ? Status.ADOPTING : Status.ADOPTED;

    await this.prisma.petStatus.create({
      data: {
        petId: petId,
        status: status,
      },
    });

    const adoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
        userId: userId,
      },
    });

    if (!adoption) {
      await this.prisma.adoption.create({
        data: {
          petId: petId,
          userId: userId,
        },
      });
    } else {
      await this.prisma.adoption.update({
        where: { adoptionId: adoption.adoptionId },
        data: {
          petId: petId,
          userId: userId,
        },
      });
    }
  }
}

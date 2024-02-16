import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { Status } from '@prisma/client';
import { AuthHelperService } from 'src/auth/authHelper.service';
import { AdoptionDto } from './dto/adoption.dto';
import { PrismaHelperService } from '../../prisma/prismaHelper.service';

@Injectable()
export class AdoptionService {
  constructor(
    private prisma: PrismaService,
    private prismaHelper: PrismaHelperService,
    private authHelper: AuthHelperService,
  ) {}

  async startAdoptionProcess(petId: number, req: Request) {
    const userId = await this.authHelper.getUserIdFromReq(req);

    const pet = await this.prisma.pet.findUnique({
      where: { petId: petId },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found`);
    }

    this.setAdoptionStatus(petId, userId);

    return;
  }

  async finishAdoptionProcess(dto: AdoptionDto) {
    const pet = await this.prisma.pet.findUnique({
      where: { petId: dto.petId },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${dto.petId} not found`);
    }

    this.setAdoptionStatus(dto.petId, dto.userId, true);
  }

  async cancelAdoptionProcess(petId: number, req: Request) {
    const adoptionStatus = await this.getAdoptionStatusForPet(petId);
    const userId = await this.authHelper.getUserIdFromReq(req);
    if (adoptionStatus.userId !== userId && !this.authHelper.isAdmin(req)) {
      throw new ForbiddenException(
        'You are not allowed to cancel the adoption',
      );
    }

    this.setAdoptionStatus(petId, userId, false, true);
  }

  private async getAdoptionStatusForPet(petDd: number) {
    const adoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petDd,
      },
    });
    if (!adoption) {
      throw new NotFoundException(
        `Adoption for pet with ID ${petDd} not found`,
      );
    }

    const latestStatus = await this.prismaHelper.getLatestStatusForPet(petDd);
    if (!latestStatus) {
      throw new NotFoundException(`Status for pet with ID ${petDd} not found`);
    }

    return { ...adoption, latestStatus };
  }

  private async setAdoptionStatus(
    petId: number,
    userId: string,
    isFinished: boolean = false,
    cancel: boolean = false,
  ) {
    let status: Status = isFinished ? Status.ADOPTED : Status.ADOPTING;
    if (cancel) {
      status = Status.INSHELTER;
    }

    const adoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
        userId: userId,
      },
    });

    if (adoption.userId !== userId) {
      throw new Error('You are not allowed to change the adoption status');
    }

    await this.prisma.petStatus.create({
      data: {
        petId: petId,
        status: status,
      },
    });

    if (cancel && adoption) {
      await this.prisma.adoption.delete({
        where: { adoptionId: adoption.adoptionId },
      });
      return;
    }

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

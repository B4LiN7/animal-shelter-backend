import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';
import { Status } from '@prisma/client';
import { AuthHelperService } from 'src/auth/authHelper.service';
import { AdoptionDto, AdoptionStatus } from './dto/adoption.dto';
import { PetHelperService } from 'src/pet/petHelper.service';

@Injectable()
export class AdoptionService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
    private authHelper: AuthHelperService,
  ) {}

  /**
   * Start the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async startAdoptionProcess(petId: number, req: Request) {
    const userId = await this.authHelper.getUserIdFromReq(req);

    const pet = await this.prisma.pet.findUnique({
      where: { petId: petId },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found.`);
    }

    const dto: AdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.ADOPTING,
    };

    this.setAdoptionStatus(dto);

    return;
  }

  /**
   * Finish the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async cancelAdoptionProcess(petId: number, req: Request) {
    const userId = await this.authHelper.getUserIdFromReq(req);
    const asAdmin: boolean = await this.authHelper.isAdmin(req);

    const dto: AdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.CANCELLED,
    };

    this.setAdoptionStatus(dto, asAdmin);
  }

  /**
   * Set the adoption process for a pet (for admin or shelter worker only)
   * @param dto - The adoption DTO
   */
  async setAdoptionProcess(dto: AdoptionDto) {
    this.setAdoptionStatus(dto, true);
  }

  /**
   * Get the adoption status for a pet
   * @param petId - The ID of the pet
   * @returns The adoption status for the pet: userId, petId, latestStatus
   */
  private async getAdoptionStatusForPet(petId: number) {
    const runningAdoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
      },
    });
    if (!runningAdoption) {
      throw new NotFoundException(
        `Adoption for pet with ID ${petId} not found`,
      );
    }

    const latestStatus = await this.petHelper.getLatestStatusForPet(petId);
    if (!latestStatus) {
      throw new NotFoundException(`Status for pet with ID ${petId} not found`);
    }

    return { ...runningAdoption, latestStatus };
  }

  /**
   * Set the adoption status for a pet
   * @param dto - The adoption DTO which contains the pet ID, user ID and the new status
   * @param asAdmin - If the function is called by an admin
   */
  private async setAdoptionStatus(dto: AdoptionDto, asAdmin = false) {
    const { petId, userId, status } = dto;

    // Check if the pet and user exist
    const pet = await this.prisma.pet.findUnique({
      where: { petId: petId },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found.`);
    }
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Set the new status for the pet then create a new status entry for pet
    let newStatus: Status = Status.UNKNOWN;
    switch (status) {
      case AdoptionStatus.ADOPTING:
        newStatus = Status.ADOPTING;
        break;
      case AdoptionStatus.ADOPTED:
        newStatus = Status.ADOPTED;
        break;
      case AdoptionStatus.CANCELLED:
        newStatus = Status.INSHELTER;
        break;
    }
    await this.prisma.petStatus.create({
      data: {
        petId: petId,
        status: newStatus,
      },
    });

    // Search for an existing adoption entry for the pet
    const runningAdoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
      },
    });

    // If there is no running adoption, create a new adoption entry
    if (runningAdoption) {
      // Check if the user is allowed to change the status
      if (runningAdoption.userId !== userId && !asAdmin) {
        throw new ForbiddenException(
          'You are not allowed to change the adoption status of this pet',
        );
      }

      // If the status is cancelled, delete the adoption entry
      if (status === AdoptionStatus.CANCELLED) {
        await this.prisma.adoption.delete({
          where: {
            userId_petId: {
              userId: runningAdoption.userId,
              petId: runningAdoption.petId,
            },
          },
        });
        return;
      }

      // Update the adoption entry
      await this.prisma.adoption.update({
        where: {
          userId_petId: {
            userId: runningAdoption.userId,
            petId: runningAdoption.petId,
          },
        },
        data: {
          petId: petId,
          userId: userId,
        },
      });
    } else {
      // If there is no running adoption, create a new adoption entry
      await this.prisma.adoption.create({
        data: {
          petId: petId,
          userId: userId,
        },
      });
    }
  }
}
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import {
  PetStatusEnum as Status,
  AdoptionStatusEnum as PAdoptionStatus,
  PermissionEnum as Perm,
} from '@prisma/client';
import { UserHelperService } from 'src/user/user.helper.service';
import { UpdateAdoptionDto, AdoptionStatus } from './dto/update.adoption.dto';
import { PetHelperService } from 'src/pet/petHelper.service';

@Injectable()
export class AdoptionService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
    private userHelper: UserHelperService,
  ) {}

  /**
   * Get the adoption status for a pets
   * @returns The adoption status for the pets: userId, petId, latestStatus
   */
  async getAllAdoptionProcesses() {
    const adoptions = await this.prisma.adoption.findMany();
    const adoptionsWithStatus: any[] = [];
    for (const adoption of adoptions) {
      const latestStatus = await this.getAdoptionStatusForPet(adoption.petId);
      adoptionsWithStatus.push(latestStatus);
    }
    return adoptionsWithStatus;
  }

  /**
   * Start the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async startAdoptionProcess(petId: string, req: Request) {
    const token = await this.userHelper.decodeTokenFromReq(req);
    const userId = token.userId;

    const pet = await this.prisma.pet.findUnique({
      where: { petId: petId },
    });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${petId} not found.`);
    }

    const dto: UpdateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.ADOPTING,
    };

    await this.setAdoptionStatus(dto);

    return await this.getAdoptionStatusForPet(petId);
  }

  /**
   * Finish the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async cancelAdoptionProcess(petId: string, req: Request) {
    const token = await this.userHelper.decodeTokenFromReq(req);
    const userId = token.userId;
    const asAdmin: boolean = token.permissions.includes(Perm.SET_ADOPTION);

    const dto: UpdateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.CANCELLED,
    };

    await this.setAdoptionStatus(dto, asAdmin);

    return await this.getAdoptionStatusForPet(petId);
  }

  /**
   * Set the adoption process for a pet (for admin or shelter worker only)
   * @param dto - The adoption DTO
   */
  async setAdoptionProcess(dto: UpdateAdoptionDto) {
    await this.setAdoptionStatus(dto, true);
    return await this.getAdoptionStatusForPet(dto.petId);
  }

  /**
   * Get the adoption status for a pet
   * @param petId - The ID of the pet
   * @returns The adoption status for the pet: userId, petId, latestStatus
   */
  private async getAdoptionStatusForPet(petId: string) {
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

    return { ...runningAdoption, status: latestStatus };
  }

  /**
   * Set the adoption status for a pet
   * @param dto - The adoption DTO which contains the pet ID, user ID and the new status
   * @param asAdmin - If the function is called by an admin
   */
  private async setAdoptionStatus(dto: UpdateAdoptionDto, asAdmin = false) {
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

    // Set the new status for the pet
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

    // Search for an existing adoption entry for the pet
    const runningAdoption = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
      },
    });

    // If there is a running adoption, update it otherwise, create a new one
    if (runningAdoption) {
      // Check if the user is allowed to change the status
      if (runningAdoption.userId !== userId && !asAdmin) {
        throw new ForbiddenException(
          'You are not allowed to change the adoption status of this pet',
        );
      }

      // If the status is cancelled, delete the adoption entry otherwise, update it
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
      } else {
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
      }
    } else {
      // If there is no running adoption, create a new adoption entry
      await this.prisma.adoption.create({
        data: {
          petId: petId,
          userId: userId,
          status: PAdoptionStatus.PENDING,
        },
      });
    }

    // Create a new status entry for the pet
    await this.prisma.petStatus.create({
      data: {
        petId: petId,
        status: newStatus,
      },
    });
  }
}

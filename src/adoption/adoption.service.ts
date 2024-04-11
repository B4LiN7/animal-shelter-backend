import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import {
  PetStatusEnum as Status,
  AdoptionStatusEnum as AdoptionStatus,
} from '@prisma/client';
import { UpdateAdoptionDto } from './dto/update.adoption.dto';
import { AdoptionType } from './type/adoption.type';

@Injectable()
export class AdoptionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all adoption processes
   * @returns {Promise<AdoptionType[]>}
   */
  async getAllAdoptionProcess(): Promise<AdoptionType[]> {
    const adoptions = await this.prisma.adoption.findMany();
    if (!adoptions) {
      throw new NotFoundException('No adoptions found');
    }
    return adoptions;
  }

  /**
   * Get the adoption status for a pet
   * @param petId - The ID of the pet
   * @param isPending - If the adoption is pending
   * @returns {Promise<AdoptionType>}
   */
  async getAllAdoptionProcessesForPet(
    petId: string,
    isPending: boolean = false,
  ): Promise<AdoptionType[]> {
    const adoptionsForPet = await this.prisma.adoption.findMany({
      where: {
        petId: petId,
        status: isPending ? AdoptionStatus.PENDING : undefined,
      },
    });
    if (!adoptionsForPet) {
      throw new NotFoundException(
        `Adoption for pet with ID ${petId} not found`,
      );
    }
    return adoptionsForPet;
  }

  /**
   * Get the pending adoption processes
   */
  async getPendingAdoptionProcess() {
    const adoptions = await this.prisma.adoption.findMany({
      where: {
        status: AdoptionStatus.PENDING,
      },
    });
    if (!adoptions) {
      throw new NotFoundException('No pending adoptions found');
    }
    return adoptions;
  }

  /**
   * Get the adoption process
   * @param adoptionId - The ID of the adoption
   * @returns {Promise<AdoptionType>}
   */
  async getAdoptionProcess(adoptionId: string): Promise<AdoptionType> {
    const adoption = await this.prisma.adoption.findFirst({
      where: {
        adoptionId: adoptionId,
      },
    });
    if (!adoption) {
      throw new NotFoundException(`Adoption with ID ${adoptionId} not found`);
    }
    return adoption;
  }

  /**
   * Get the adoption process for the user
   * @param req - The Request object for userId
   */
  async getMyAdoptionProcess(req: Request): Promise<AdoptionType[]> {
    const token = req.user['decodedToken'];
    const userId = token.userId;

    const adoptions = await this.prisma.adoption.findMany({
      where: {
        userId: userId,
      },
    });
    if (!adoptions) {
      throw new NotFoundException(
        `No adoptions found for user with ID ${userId}`,
      );
    }
    return adoptions;
  }

  /**
   * Start the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async startAdoptionProcess(petId: string, req: Request) {
    const token = req.user['decodedToken'];
    const userId = token.userId;

    const dto: UpdateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.PENDING,
      reason: null,
    };

    return this.setAdoption(dto);
  }

  /**
   * Finish the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async cancelAdoptionProcess(petId: string, req: Request) {
    const token = req.user['decodedToken'];
    const userId = token.userId;

    const dto: UpdateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.CANCELLED,
      reason: null,
    };

    return this.setAdoption(dto);
  }

  /**
   * Modify the adoption process. This can be used to approve or reject the adoption (You can cancel and start it, but it's not recommended)
   * @param dto - The adoption DTO
   */
  async modifyTheAdoption(dto: UpdateAdoptionDto) {
    const dto2: UpdateAdoptionDto = {
      petId: dto.petId,
      userId: dto.userId,
      status: dto.status,
      reason: dto.reason,
    };
    return this.setAdoption(dto2);
  }

  /**
   * Delete the adoption process and set the pet status to unknown
   * @param adoptionId - The ID of the adoption
   */
  async deleteAdoptionProcess(adoptionId: string) {
    const deletedAdoption = await this.prisma.adoption.delete({
      where: {
        adoptionId: adoptionId,
      },
    });
    if (deletedAdoption.status === AdoptionStatus.APPROVED) {
      await this.prisma.petStatus.create({
        data: {
          petId: deletedAdoption.petId,
          status: Status.UNKNOWN,
        },
      });
    }
    return deletedAdoption;
  }

  /**
   * Set the adoption status for a pet
   * @param dto - The adoption DTO which contains the pet ID, user ID and the new status
   * @returns {Promise<AdoptionType>} - The modified adoption status
   */
  private async setAdoption(dto: UpdateAdoptionDto): Promise<AdoptionType> {
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

    // Search for adoptions
    const petAdoptions = await this.prisma.adoption.findMany({
      where: {
        petId: petId,
        status: { in: [AdoptionStatus.PENDING, AdoptionStatus.APPROVED] },
      },
    });
    const runningAdoptionForPet = petAdoptions.find(
      (adoption) => adoption.status === AdoptionStatus.PENDING,
    );
    const adoptedPet = petAdoptions.find(
      (adoption) => adoption.status === AdoptionStatus.APPROVED,
    );

    switch (status) {
      case AdoptionStatus.PENDING:
        if (runningAdoptionForPet) {
          throw new ForbiddenException(
            `An adoption for pet with ID ${petId} is already pending.`,
          );
        } else if (adoptedPet) {
          throw new ForbiddenException(
            `Pet with ID ${petId} is already adopted.`,
          );
        }
        delete dto.reason;
        return this.prisma.adoption.create({
          data: {
            ...dto,
          },
        });

      case AdoptionStatus.CANCELLED:
        if (!runningAdoptionForPet || runningAdoptionForPet.userId !== userId) {
          throw new ForbiddenException(
            `No pending adoption for pet ${petId} found for user ${userId}.`,
          );
        }
        return this.prisma.adoption.update({
          where: {
            adoptionId: runningAdoptionForPet.adoptionId,
          },
          data: {
            status: status,
          },
        });

      case AdoptionStatus.REJECTED:
        if (!runningAdoptionForPet) {
          throw new ForbiddenException(
            `No pending adoption to reject for pet ${petId} found.`,
          );
        }
        return this.prisma.adoption.update({
          where: {
            adoptionId: runningAdoptionForPet.adoptionId,
          },
          data: {
            status: status,
            reason: dto.reason,
          },
        });

      case AdoptionStatus.APPROVED:
        if (!runningAdoptionForPet) {
          throw new ForbiddenException(
            `No pending adoption to approve for pet with ID ${petId} found.`,
          );
        }
        const updAdoption = await this.prisma.adoption.update({
          where: {
            adoptionId: runningAdoptionForPet.adoptionId,
          },
          data: {
            status: status,
            reason: dto.reason,
          },
        });
        await this.prisma.petStatus.create({
          data: {
            petId: petId,
            status: Status.ADOPTED,
          },
        });
        return updAdoption;

      default:
        throw new ForbiddenException('Not sure what to do.');
    }
  }
}

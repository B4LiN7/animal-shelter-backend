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
import { UserHelperService } from 'src/user/user-helper.service';
import { UpdateAdoptionDto } from './dto/update.adoption.dto';
import { PetHelperService } from 'src/pet/pet.helper.service';
import { AdoptionType } from './type/adoption.type';

@Injectable()
export class AdoptionService {
  constructor(
    private prisma: PrismaService,
    private petHelper: PetHelperService,
    private userHelper: UserHelperService,
  ) {}

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
   * Start the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async startAdoptionProcess(petId: string, req: Request) {
    const token = await this.userHelper.decodeAccessTokenFromReq(req);
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
      status: AdoptionStatus.PENDING,
      reason: null,
    };

    const adoption = await this.setAdoption(dto);

    return await this.getAdoptionProcess(adoption.adoptionId);
  }

  /**
   * Finish the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async cancelAdoptionProcess(petId: string, req: Request) {
    const token = await this.userHelper.decodeAccessTokenFromReq(req);
    const userId = token.userId;

    const dto: UpdateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.CANCELLED,
      reason: null,
    };

    const adoption = await this.setAdoption(dto);

    return await this.getAdoptionProcess(adoption.adoptionId);
  }

  /**
   * Set the adoption process for a pet (for admin or shelter worker only)
   * @param dto - The adoption DTO
   */
  async setAdoptionProcess(dto: UpdateAdoptionDto) {
    const { userId } = dto;
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const adoption = await this.setAdoption(dto);
    return await this.getAdoptionProcess(adoption.adoptionId);
  }

  /**
   * Set the adoption status for a pet
   * @param dto - The adoption DTO which contains the pet ID, user ID and the new status
   * @returns {Promise<string>} - The modified adoption status
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

    // Search for running adoptions
    const runningAdoptionForPet = await this.prisma.adoption.findFirst({
      where: {
        petId: petId,
        status: AdoptionStatus.PENDING,
      },
    });

    switch (status) {
      case AdoptionStatus.PENDING:
        if (runningAdoptionForPet) {
          throw new ForbiddenException(
            `An adoption for pet with ID ${petId} is already pending.`,
          );
        }
        delete dto.reason;
        return this.prisma.adoption.create({
          data: {
            ...dto,
          },
        });
        break;

      case AdoptionStatus.CANCELLED:
        if (!runningAdoptionForPet || runningAdoptionForPet.userId !== userId) {
          throw new ForbiddenException(
            `No pending adoption for pet with ID ${petId} found for user with ID ${userId}.`,
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
        break;

      case AdoptionStatus.REJECTED:
        if (!runningAdoptionForPet) {
          throw new ForbiddenException(
            `No pending adoption to reject for pet with ID ${petId} found.`,
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
        break;

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
        break;

      default:
        throw new ForbiddenException('Not sure what to do.');
    }
  }
}

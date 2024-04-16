import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import {
  AdoptionStatusEnum as AdoptionStatus,
  PetStatusEnum as Status,
} from '@prisma/client';
import { CreateAdoptionDto } from './dto/create.adoption.dto';
import { AdoptionType } from './type/adoption.type';
import { SearchAdoptionDto } from './dto/search.adoption.dto';
import { UpdateAdoptionDto } from './dto/update.adoption.dto';

@Injectable()
export class AdoptionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all adoption processes
   * @returns {Promise<AdoptionType[]>} - The list of adoption processes
   */
  async getAllAdoptionProcess(
    search?: SearchAdoptionDto,
  ): Promise<AdoptionType[]> {
    if (search.status || search.userId || search.petId) {
      const searchCriteria = {};

      if (search) {
        if (search.status) {
          searchCriteria['status'] = search.status;
        }
        if (search.userId) {
          searchCriteria['userId'] = search.userId;
        }
        if (search.petId) {
          searchCriteria['petId'] = search.petId;
        }
      }

      return this.prisma.adoption.findMany({
        where: searchCriteria,
      });
    }
    return this.prisma.adoption.findMany();
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
   * Get the adoption processes for the user
   * @param req - The Request object for userId
   * @param search - The search criteria
   * @returns {Promise<AdoptionType[]>} - The list of adoption processes
   */
  async getMyAdoptionProcesses(
    req: Request,
    search?: SearchAdoptionDto,
  ): Promise<AdoptionType[]> {
    const token = req.user['decodedToken'];
    const userId = token.userId;

    const searchCriteria = {};
    searchCriteria['userId'] = userId;

    if (search) {
      if (search.status) {
        searchCriteria['status'] = search.status;
      }
      if (search.petId) {
        searchCriteria['petId'] = search.petId;
      }
    }

    return this.prisma.adoption.findMany({
      where: searchCriteria,
    });
  }

  /**
   * Start the adoption process for a pet
   * @param petId - The ID of the pet
   * @param req - The Request object for userId
   */
  async startAdoptionProcess(petId: string, req: Request) {
    const token = req.user['decodedToken'];
    const userId = token.userId;

    const dto: CreateAdoptionDto = {
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

    const dto: CreateAdoptionDto = {
      petId: petId,
      userId: userId,
      status: AdoptionStatus.CANCELLED,
      reason: null,
    };

    return this.setAdoption(dto);
  }

  /**
   * Delete the adoption process and set the pet status to unknown
   * @param adoptionId - The ID of the adoption
   */
  async deleteAdoptionProcess(adoptionId: string): Promise<AdoptionType> {
    const deletedAdoption = await this.prisma.adoption.delete({
      where: {
        adoptionId: adoptionId,
      },
    });

    const latestStatusForPet = await this.prisma.petStatus.findFirst({
      where: {
        petId: deletedAdoption.petId,
      },
      orderBy: {
        from: 'desc',
      },
    });
    if (
      deletedAdoption.status === AdoptionStatus.APPROVED &&
      latestStatusForPet.status === Status.ADOPTED
    ) {
      await this.prisma.petStatus.create({
        data: {
          petId: deletedAdoption.petId,
          status: Status.INSHELTER,
        },
      });
    }

    return deletedAdoption;
  }

  async updateAdoptionProcess(
    adoptionId: string,
    dto: UpdateAdoptionDto,
  ): Promise<AdoptionType> {
    const adoption = await this.prisma.adoption.findFirst({
      where: {
        adoptionId: adoptionId,
      },
    });
    if (!adoption) {
      throw new NotFoundException(`Adoption with ID ${adoptionId} not found`);
    }

    const updAdoption = await this.prisma.adoption.update({
      where: {
        adoptionId: adoptionId,
      },
      data: {
        ...dto,
      },
    });

    const latestStatusForPet = await this.prisma.petStatus.findFirst({
      where: {
        petId: updAdoption.petId,
      },
      orderBy: {
        from: 'desc',
      },
    });

    if (
      (updAdoption.status === AdoptionStatus.REJECTED &&
        latestStatusForPet.status === Status.ADOPTING) ||
      (updAdoption.status === AdoptionStatus.CANCELLED &&
        latestStatusForPet.status === Status.ADOPTING) ||
      (updAdoption.status === AdoptionStatus.RETURNED &&
        latestStatusForPet.status === Status.ADOPTED)
    ) {
      await this.prisma.petStatus.create({
        data: {
          petId: updAdoption.petId,
          status: Status.INSHELTER,
        },
      });
    } else if (
      updAdoption.status === AdoptionStatus.APPROVED &&
      latestStatusForPet.status === Status.ADOPTING
    ) {
      await this.prisma.petStatus.create({
        data: {
          petId: updAdoption.petId,
          status: Status.ADOPTED,
        },
      });
    }

    return updAdoption;
  }

  /**
   * Set the adoption status for a pet
   * @param dto - The adoption DTO which contains the pet ID, user ID and the new status
   * @returns {Promise<AdoptionType>} - The modified adoption status
   */
  async setAdoption(dto: CreateAdoptionDto): Promise<AdoptionType> {
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
        if (runningAdoptionForPet && runningAdoptionForPet.userId === userId) {
          return {
            ...runningAdoptionForPet,
          };
        } else if (runningAdoptionForPet) {
          throw new ForbiddenException(
            `An adoption for pet with ID ${petId} is already pending.`,
          );
        } else if (adoptedPet) {
          throw new ForbiddenException(
            `Pet with ID ${petId} is already adopted.`,
          );
        }
        delete dto.reason;
        const newAdoption = await this.prisma.adoption.create({
          data: {
            ...dto,
          },
        });
        await this.prisma.petStatus.create({
          data: {
            petId: petId,
            status: Status.ADOPTING,
          },
        });
        return newAdoption;

      case AdoptionStatus.CANCELLED:
        if (!runningAdoptionForPet || runningAdoptionForPet.userId !== userId) {
          throw new NotFoundException(
            `No pending adoption for pet ${petId} found for user ${userId}.`,
          );
        }
        const cancelledAdoption = await this.prisma.adoption.update({
          where: {
            adoptionId: runningAdoptionForPet.adoptionId,
          },
          data: {
            status: status,
          },
        });
        await this.prisma.petStatus.create({
          data: {
            petId: petId,
            status: Status.UNKNOWN,
          },
        });
        return cancelledAdoption;
      /*
      * This code is commented out because it is not used in this part of application
      * Moved to updateAdoptionProcess method
      *
      case AdoptionStatus.REJECTED:
        if (!runningAdoptionForPet) {
          throw new NotFoundException(
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
          throw new NotFoundException(
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
        */
      default:
        throw new InternalServerErrorException('Not sure what to do.');
    }
  }
}

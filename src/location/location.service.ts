import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LocationDto } from './dto/location.dto';
import { UserHelperService } from '../user/userHelper.service';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
  ) {}

  async getMyLocations(req: Request) {
    const user = await this.userHelper.getUserFromReq(req);
    let newUserId = user.userId;
    if (user.role !== Role.ADMIN) {
      newUserId = user.userId;
    }
    const myLocations = await this.prisma.location.findMany({
      where: {
        userId: newUserId,
      },
    });
    if (!myLocations || myLocations.length === 0) {
      throw new NotFoundException(`You don't have any locations yet.`);
    }
    return myLocations;
  }

  async getAllLocations() {
    return this.prisma.location.findMany();
  }

  async getLocation(id: number) {
    return this.prisma.location.findUnique({
      where: {
        locationId: id,
      },
    });
  }

  async addLocation(dto: LocationDto, req: Request) {
    const userId = await this.userHelper.getUserIdFromReq(req);
    delete dto.userId;
    return  this.prisma.location.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
  }

  async updateLocation(id: number, dto: LocationDto) {
    return this.prisma.location.update({
      where: {
        locationId: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteLocation(id: number) {
    return this.prisma.location.delete({
      where: {
        locationId: id,
      },
    });
  }
}

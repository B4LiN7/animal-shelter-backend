import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationDto } from './dto/location.dto';
import { UserHelperService } from 'src/user/user-helper.service';
import { Request } from 'express';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService,
    private userHelper: UserHelperService,
  ) {}

  async getMyLocations(req: Request) {
    const token = await this.userHelper.decodeTokenFromReq(req);
    const myLocations = await this.prisma.location.findMany({
      where: {
        userId: token.userId,
      },
    });
    if (myLocations.length === 0) {
      throw new NotFoundException(`You don't have any locations, yet.`);
    }
    return myLocations;
  }

  async addToMyLocations(dto: LocationDto, req: Request) {
    const token = await this.userHelper.decodeTokenFromReq(req);
    delete dto.userId;
    return this.prisma.location.create({
      data: {
        userId: token.userId,
        ...dto,
      },
    });
  }

  async getAllLocations() {
    return this.prisma.location.findMany();
  }

  async getLocation(id: string) {
    return this.prisma.location.findUnique({
      where: {
        locationId: id,
      },
    });
  }

  async addLocation(dto: LocationDto) {
    return this.prisma.location.create({
      data: {
        ...dto,
      },
    });
  }

  async updateLocation(id: string, dto: LocationDto) {
    return this.prisma.location.update({
      where: {
        locationId: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteLocation(id: string) {
    return this.prisma.location.delete({
      where: {
        locationId: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

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

  async addLocation(dto: LocationDto) {
    return this.prisma.location.create({
      data: {
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

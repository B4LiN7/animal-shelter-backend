import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LocationDto } from './dto/location.dto';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService,
    private utility: UtilityService,
  ) {}

  async getAllLocations() {
    return this.prisma.location.findMany();
  }

  async getLocation(idStr) {
    const id = this.utility.tryParseId(idStr);
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

  async updateLocation(idStr, dto: LocationDto) {
    const id = this.utility.tryParseId(idStr);
    return this.prisma.location.update({
      where: {
        locationId: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteLocation(idStr) {
    const id = this.utility.tryParseId(idStr);
    return this.prisma.location.delete({
      where: {
        locationId: id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create.location.dto';
import { Request } from 'express';
import { UpdateLocationDto } from './dto/update.location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getMyLocations(req: Request) {
    const token = req.user['decodedToken'];
    return this.prisma.location.findMany({
      where: {
        userId: token.userId,
      },
    });
  }

  async addToMyLocations(dto: CreateLocationDto, req: Request) {
    const token = req.user['decodedToken'];
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

  async addLocation(dto: CreateLocationDto) {
    return this.prisma.location.create({
      data: {
        ...dto,
      },
    });
  }

  async updateLocation(id: string, dto: UpdateLocationDto) {
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

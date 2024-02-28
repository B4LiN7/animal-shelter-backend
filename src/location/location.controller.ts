import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as RoleEnum } from '@prisma/client';

@Controller('location')
@UseGuards(RoleGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @Role(RoleEnum.ADMIN)
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  async getLocation(@Param('id') id: number) {
    return this.locationService.getLocation(id);
  }

  @Post()
  async addLocation(@Body() dto: LocationDto) {
    return this.locationService.addLocation(dto);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body() dto: LocationDto) {
    return this.locationService.updateLocation(id, dto);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return this.locationService.deleteLocation(id);
  }
}

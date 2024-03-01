import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { UserGuard } from '../auth/guard/user.guard';
import { Request } from 'express';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../auth/decorator/role.decorator';
import { Role as RoleEnum } from '@prisma/client';

@Controller('location')
@UseGuards(UserGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('my')
  async getMyLocations(@Req() req: Request) {
    return this.locationService.getMyLocations(req);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN)
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }

  @Get(':locationId')
  async getLocation(@Param('locationId') id: number) {
    return this.locationService.getLocation(id);
  }

  @Post()
  async addLocation(@Body() dto: LocationDto, @Req() req: Request){
    return this.locationService.addLocation(dto, req);
  }

  @Put(':locationId')
  async updateLocation(@Param('locationId') id: number, @Body() dto: LocationDto) {
    return this.locationService.updateLocation(id, dto);
  }

  @Delete(':locationId')
  async deleteLocation(@Param('locationId') id: number) {
    return this.locationService.deleteLocation(id);
  }
}

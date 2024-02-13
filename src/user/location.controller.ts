import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  async getLocation(@Param('id') id: string) {
    return this.locationService.getLocation(id);
  }

  @Post()
  async addLocation(@Body() dto: LocationDto) {
    return this.locationService.addLocation(dto);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: string, @Body() dto: LocationDto) {
    return this.locationService.updateLocation(id, dto);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    return this.locationService.deleteLocation(id);
  }
}

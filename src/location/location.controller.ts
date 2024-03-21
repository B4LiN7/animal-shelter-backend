import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { Request } from 'express';
import { LocationGuard } from 'src/auth/guard/location.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';

@Controller('location')
@UseGuards(AuthGuard('jwt'), LocationGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /* For logged-in users */
  @Get('my')
  async getMyLocations(@Req() req: Request) {
    return this.locationService.getMyLocations(req);
  }
  @Post('my')
  async addLocationToMyLocations(
    @Body() dto: LocationDto,
    @Req() req: Request,
  ) {
    return this.locationService.addToMyLocations(dto, req);
  }

  /* For the owners of account and admin */
  @Get(':id')
  async getLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.getLocation(id);
  }
  @Put(':id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LocationDto,
  ) {
    return this.locationService.updateLocation(id, dto);
  }
  @Delete(':id')
  async deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }

  /* For admins */
  @Get()
  @UseGuards(RoleGuard)
  @Role(R.ADMIN)
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }
  @Post()
  @UseGuards(RoleGuard)
  @Role(R.ADMIN)
  async addLocation(@Body() dto: LocationDto, @Req() req: Request) {
    return this.locationService.addToMyLocations(dto, req);
  }
}

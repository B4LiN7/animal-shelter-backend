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
import { CreateLocationDto } from './dto/create.location.dto';
import { Request } from 'express';
import { LocationGuard } from 'src/auth/guard/location.guard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';
import { UpdateLocationDto } from './dto/update.location.dto';

@Controller('location')
@UseGuards(AuthGuard('jwt-access-token'))
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /* For logged-in users */
  @Get('my')
  async getMyLocations(@Req() req: Request) {
    return this.locationService.getMyLocations(req);
  }
  @Post('my')
  async addLocationToMyLocations(
    @Body() dto: CreateLocationDto,
    @Req() req: Request,
  ) {
    return this.locationService.addToMyLocations(dto, req);
  }

  /* For the owners of account and admin */
  @Get(':id')
  @UseGuards(LocationGuard)
  async getLocation(@Param('id') id: string) {
    return this.locationService.getLocation(id);
  }
  @Put(':id')
  @UseGuards(LocationGuard)
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(id, dto);
  }
  @Delete(':id')
  @UseGuards(LocationGuard)
  async deleteLocation(@Param('id') id: string) {
    return this.locationService.deleteLocation(id);
  }

  /* For admins */
  @Get()
  @UseGuards(PermissionGuard)
  @Permissions(Perm.ACCESS_ANY_LOCATION)
  async getAllLocations() {
    return this.locationService.getAllLocations();
  }
  @Post()
  @UseGuards(PermissionGuard)
  @Permissions(Perm.ACCESS_ANY_LOCATION)
  async addLocation(@Body() dto: CreateLocationDto, @Req() req: Request) {
    return this.locationService.addToMyLocations(dto, req);
  }
}

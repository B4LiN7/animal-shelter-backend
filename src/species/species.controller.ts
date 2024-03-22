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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create.species.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  /* Anyone can get species */
  @Get()
  async getAllSpecies() {
    return this.speciesService.getAllSpecies();
  }
  @Get('/:id')
  async getSpecies(@Param('id') id: string) {
    return this.speciesService.getSpecies(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.CREATE_SPECIES)
  async addSpecies(@Body() dto: CreateSpeciesDto) {
    return this.speciesService.addSpecies(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.UPDATE_SPECIES)
  async updateSpecies(@Param('id') id: string, @Body() dto: CreateSpeciesDto) {
    return this.speciesService.updateSpecies(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.DELETE_SPECIES)
  async deleteSpecies(@Param('id') id: string) {
    return this.speciesService.deleteSpecies(id);
  }
}

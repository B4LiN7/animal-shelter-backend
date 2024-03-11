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
import { CreateSpeciesDto } from './dto/createSpecies.dto';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  /* Anyone can get species */
  @Get()
  async getAllSpecies() {
    return this.speciesService.getAllSpecies();
  }
  @Get(':id')
  async getSpecies(id: number) {
    return this.speciesService.getSpecies(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async addSpecies(@Body() dto: CreateSpeciesDto) {
    return this.speciesService.addSpecies(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async updateSpecies(@Param('id') id: number, @Body() dto: CreateSpeciesDto) {
    return this.speciesService.updateSpecies(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async deleteSpecies(@Param('id') id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}

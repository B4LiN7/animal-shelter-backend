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
import { SpeciesDto } from './dto/species.dto';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';

@Controller('species')
@UseGuards(RoleGuard)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async addSpecies(@Body() dto: SpeciesDto) {
    return this.speciesService.addSpecies(dto);
  }

  @Get()
  async getAllSpecies() {
    return this.speciesService.getAllSpecies();
  }

  @Get(':id')
  async getSpecies(id: number) {
    return this.speciesService.getSpecies(id);
  }

  @Put(':id')
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async updateSpecies(@Param('id') id: number, @Body() dto: SpeciesDto) {
    return this.speciesService.updateSpecies(id, dto);
  }

  @Delete(':id')
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async deleteSpecies(@Param('id') id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}

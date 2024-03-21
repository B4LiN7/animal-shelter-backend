import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create.species.dto';
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
  @Get('/:id')
  async getSpecies(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.getSpecies(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async addSpecies(@Body() dto: CreateSpeciesDto) {
    return this.speciesService.addSpecies(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async updateSpecies(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateSpeciesDto,
  ) {
    return this.speciesService.updateSpecies(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}

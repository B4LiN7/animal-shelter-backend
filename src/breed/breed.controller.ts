import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UpdateBreedDto } from './dto/updateBreed.dto';
import { Role } from '../auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateBreedDto } from './dto/createBreed.dto';
import { PrismaExceptionFilter } from '../../prisma/prisma.exception.filter';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  /* Anyone can get breeds */
  @Get()
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }
  @Get(':id')
  async getBreed(@Param('id') id: number) {
    return this.breedService.getBreed(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.SHELTER_WORKER, R.ADMIN)
  @UseFilters(PrismaExceptionFilter)
  async addBreed(@Body() dto: CreateBreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.SHELTER_WORKER, R.ADMIN)
  async updateBreed(@Param('id') id: number, @Body() dto: UpdateBreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.SHELTER_WORKER, R.ADMIN)
  async deleteBreed(@Param('id') id: number) {
    return this.breedService.deleteBreed(id);
  }
}

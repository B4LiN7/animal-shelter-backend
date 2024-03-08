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
import { BreedService } from './breed.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { BreedDto } from './dto/breed.dto';
import { Role } from '../auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

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
  async addBreed(@Body() dto: BreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.SHELTER_WORKER, R.ADMIN)
  async updateBreed(@Param('id') id: number, @Body() dto: BreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.SHELTER_WORKER, R.ADMIN)
  async deleteBreed(@Param('id') id: number) {
    return this.breedService.deleteBreed(id);
  }
}

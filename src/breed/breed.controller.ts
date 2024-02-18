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
import { Role as RoleEnum } from '@prisma/client';

@Controller('breed')
@UseGuards(RoleGuard)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  @Role(RoleEnum.ADMIN)
  async addBreed(@Body() dto: BreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Get()
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }

  @Get(':id')
  async getBreed(@Param('id') id: number) {
    return this.breedService.getBreed(id);
  }

  @Put(':id')
  @Role(RoleEnum.ADMIN)
  async updateBreed(@Param('id') id: number, @Body() dto: BreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @Role(RoleEnum.ADMIN)
  async deleteBreed(@Param('id') id: number) {
    return this.breedService.deleteBreed(id);
  }
}

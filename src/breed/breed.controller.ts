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
import { UpdateBreedDto } from './dto/update.breed.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateBreedDto } from './dto/create.breed.dto';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  /* Anyone can get breeds */
  @Get()
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }
  @Get(':id')
  async getBreed(@Param('id') id: string) {
    return this.breedService.getBreed(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.CREATE_BREED)
  async addBreed(@Body() dto: CreateBreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.UPDATE_BREED)
  async updateBreed(@Param('id') id: string, @Body() dto: UpdateBreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.DELETE_BREED)
  async deleteBreed(@Param('id') id: string) {
    return this.breedService.deleteBreed(id);
  }
}

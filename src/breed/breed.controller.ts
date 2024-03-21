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
import { BreedService } from './breed.service';
import { UpdateBreedDto } from './dto/update.breed.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateBreedDto } from './dto/create.breed.dto';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { Permission as Perm } from '@prisma/client';
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
  async getBreed(@Param('id', ParseIntPipe) id: number) {
    return this.breedService.getBreed(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.CREATE_BREED)
  async addBreed(@Body() dto: CreateBreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.UPDATE_BREED)
  async updateBreed(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBreedDto,
  ) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions(Perm.DELETE_BREED)
  async deleteBreed(@Param('id', ParseIntPipe) id: number) {
    return this.breedService.deleteBreed(id);
  }
}

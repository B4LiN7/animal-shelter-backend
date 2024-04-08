import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create.pet.dto';
import { UpdatePetDto } from './dto/update.pet.dto';
import { SearchPetDto } from './dto/search.pet.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  /* Anyone can get pets */
  @Get()
  async readAllPets(@Query() dto: SearchPetDto) {
    if (dto.status || dto.breed) {
      return this.petService.getAllPets(dto);
    }
    return this.petService.getAllPets();
  }
  @Get(':id')
  async readPet(@Param('id') id: string) {
    return this.petService.getPet(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.CREATE_PET)
  async createPet(@Body() dto: CreatePetDto) {
    return this.petService.createPet(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.UPDATE_PET)
  async updatePet(@Param('id') id: string, @Body() dto: UpdatePetDto) {
    return this.petService.updatePet(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.DELETE_PET)
  async deletePet(@Param('id') id: string) {
    return this.petService.deletePet(id);
  }

  /* Past statuses for pet */
  @Get(':id/status')
  @UseGuards(AuthGuard('jwt-access-token'))
  async readPetStatus(@Param('id') id: string) {
    return this.petService.getPetStatus(id);
  }
}

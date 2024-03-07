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
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { CreatePetDto } from './dto/createPet.dto';
import { UpdatePetDto } from './dto/updatePet.dto';
import { SearchPetDto } from './dto/searchPet.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  /* Anyone can get pets */
  @Get()
  async readAllPets(
    @Query('status') status: string,
    @Query('breedId') breed: string,
  ) {
    if (status || breed) {
      return this.petService.getAllPets({ status, breed } as SearchPetDto);
    }
    return this.petService.getAllPets();
  }
  @Get(':id')
  async readPet(@Param('id') id: number) {
    return this.petService.getPet(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async createPet(@Body() dto: CreatePetDto) {
    return this.petService.createPet(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async updatePet(@Param('id') id: number, @Body() dto: UpdatePetDto) {
    return this.petService.updatePet(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async deletePet(@Param('id') id: number) {
    return this.petService.deletePet(id);
  }

  /* Past statuses for pet */
  @Get('status/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async readPetStatus(@Param('id') id: number) {
    return this.petService.getPetStatus(id);
  }
}

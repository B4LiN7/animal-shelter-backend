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
import { Role as RoleEnum } from '@prisma/client';
import { CreatePetDto } from './dto/createPet.dto';
import { UpdatePetDto } from './dto/updatePet.dto';
import { SearchPetDto } from './dto/searchPet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async createPet(@Body() dto: CreatePetDto) {
    return this.petService.createPet(dto);
  }

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

  @Put(':id')
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async updatePet(@Param('id') id: number, @Body() dto: UpdatePetDto) {
    return this.petService.updatePet(id, dto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async deletePet(@Param('id') id: number) {
    return this.petService.deletePet(id);
  }

  @Get('status/:id')
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async readPetStatus(@Param('id') id: number) {
    return this.petService.getPetStatus(id);
  }
}

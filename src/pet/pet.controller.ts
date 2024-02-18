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
import { PetService } from './pet.service';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { PetDto } from './dto/pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async createPet(@Body() dto: PetDto) {
    return this.petService.createPet(dto);
  }

  @Get()
  async readAllPets() {
    return this.petService.readAllPets();
  }

  @Get(':id')
  async readPet(@Param('id') id: number) {
    return this.petService.readPet(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN, RoleEnum.SHELTER_WORKER)
  async updatePet(@Param('id') id: number, @Body() dto: PetDto) {
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
    return this.petService.readPetStatus(id);
  }
}

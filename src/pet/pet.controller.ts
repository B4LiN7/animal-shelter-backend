import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { AddPetDto } from './dto/addPet.dto';
import { EditPetDto } from './dto/editPet.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('pet')
@UseGuards(RolesGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('add')
  async addPet(@Body() dto: AddPetDto) {
    return this.petService.addPet(dto);
  }

  @Get('all')
  @Roles('admin', 'shelter_worker')
  async getAllPets() {
    return this.petService.getAllPets();
  }

  @Get('/:id')
  async getPet(@Param('id') id: number) {
    return this.petService.getPet(id);
  }

  @Post('update')
  async updatePet(@Body() dto: EditPetDto) {
    return this.petService.updatePet(dto);
  }

  @Get('delete/:id')
  async deletePet(@Param('id') id: number) {
    return this.petService.deletePet(id);
  }
}

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
import { PetDto } from './dto/pet.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role('admin', 'shelter_worker')
  async addPet(@Body() dto: PetDto) {
    return this.petService.addPet(dto);
  }

  @Get()
  async getAllPets() {
    return this.petService.getAllPets();
  }

  @Get(':id')
  async getPet(@Param('id') id: number) {
    return this.petService.getPet(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Role('admin', 'shelter_worker')
  async updatePet(@Param('id') id: number, @Body() dto: PetDto) {
    return this.petService.updatePet(id, dto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role('admin', 'shelter_worker')
  async deletePet(@Param('id') id: number) {
    return this.petService.deletePet(id);
  }
}

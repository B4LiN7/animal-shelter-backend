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
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('pet')
@UseGuards(RolesGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @Roles('admin', 'shelter_worker')
  async addPet(@Body() dto: PetDto) {
    return this.petService.addPet(dto);
  }

  @Get()
  async getAllPets() {
    return this.petService.getAllPets();
  }

  @Get(':id')
  async getPet(@Param('id') id: string) {
    return this.petService.getPet(id);
  }

  @Put(':id')
  @Roles('admin', 'shelter_worker')
  async updatePet(@Param('id') id: string, @Body() dto: PetDto) {
    return this.petService.updatePet(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'shelter_worker')
  async deletePet(@Param('id') id: string) {
    return this.petService.deletePet(id);
  }
}

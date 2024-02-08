import { Body, Controller, Get, Post } from "@nestjs/common";
import { PetService } from './pet.service';
import { PetDto } from './dto/pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('add')
  async addPet(@Body() dto: PetDto) {
    return this.petService.addPet(dto);
  }
}

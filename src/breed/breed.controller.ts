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
import { RoleGuard } from 'src/auth/guard/role.guard';
import { BreedDto } from './dto/breed.dto';
import { Role } from '../auth/decorator/role.decorator';

@Controller('breed')
@UseGuards(RoleGuard)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  @Role('admin')
  async addBreed(@Body() dto: BreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Get()
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }

  @Get(':id')
  async getBreed(@Param('id') id: number) {
    return this.breedService.getBreed(id);
  }

  @Put(':id')
  @Role('admin')
  async updateBreed(@Param('id') id: number, @Body() dto: BreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @Role('admin')
  async deleteBreed(@Param('id') id: number) {
    return this.breedService.deleteBreed(id);
  }
}

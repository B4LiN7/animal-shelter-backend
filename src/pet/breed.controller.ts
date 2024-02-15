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
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { BreedDto } from './dto/breed.dto';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('breed')
@UseGuards(RolesGuard)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  @Roles('admin')
  async addBreed(@Body() dto: BreedDto) {
    return this.breedService.addBreed(dto);
  }

  @Get()
  async getAllBreeds() {
    return this.breedService.getAllBreeds();
  }

  @Get(':id')
  async getBreed(@Param('id') id: string) {
    return this.breedService.getBreed(id);
  }

  @Put(':id')
  @Roles('admin')
  async updateBreed(@Param('id') id: string, @Body() dto: BreedDto) {
    return this.breedService.updateBreed(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteBreed(@Param('id') id: string) {
    return this.breedService.deleteBreed(id);
  }
}

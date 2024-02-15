import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { Request } from 'express';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AdoptionDto } from './dto/adoption.dto';

@Controller('adoption')
@UseGuards(RolesGuard)
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('adopt/:petId')
  @Roles('user', 'shelter_worker', 'admin')
  startAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }

  @Post('adoptf/:petId')
  @Roles('shelter_worker', 'admin')
  finishAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.finishAdoptionProcess(petId, req);
  }

  @Post()
  @Roles('admin')
  async createAdoption(@Body() adoptionDto: AdoptionDto) {
    return this.adoptionService.addAdoption(adoptionDto);
  }

  @Get(':id')
  @Roles('admin')
  async getAdoptionById(@Param('id') id: number) {
    return this.adoptionService.getAdoption(id);
  }

  @Put(':id')
  @Roles('admin')
  async updateAdoption(
    @Param('id') id: number,
    @Body() adoptionDto: AdoptionDto,
  ) {
    return this.adoptionService.updateAdoption(id, adoptionDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteAdoption(@Param('id') id: number) {
    return this.adoptionService.deleteAdoption(id);
  }
}

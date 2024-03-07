import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { Request } from 'express';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { AdoptionDto } from './dto/adoption.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('adoption')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Get()
  @Role(R.ADMIN, R.SHELTER_WORKER)
  getAllAdoptionProcesses() {
    return this.adoptionService.getAllAdoptionProcesses();
  }

  @Get('pet/:petId')
  @Role(R.USER)
  startAdoptionProcess(@Param('petId') petId: number, @Req() req: Request) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }

  @Delete('pet/:petId')
  cancelAdoptionProcess(@Param('petId') petId: number, @Req() req: Request) {
    return this.adoptionService.cancelAdoptionProcess(petId, req);
  }

  @Post()
  @HttpCode(200)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  setAdoptionProcess(@Body() dto: AdoptionDto) {
    return this.adoptionService.setAdoptionProcess(dto);
  }
}

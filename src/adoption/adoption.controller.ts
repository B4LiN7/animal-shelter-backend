import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { AdoptionDto } from './dto/adoption.dto';

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
  startAdoptionProcess(
    @Param('petId', ParseIntPipe) petId: number,
    @Req() req: Request,
  ) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }

  @Delete('pet/:petId')
  cancelAdoptionProcess(
    @Param('petId', ParseIntPipe) petId: number,
    @Req() req: Request,
  ) {
    return this.adoptionService.cancelAdoptionProcess(petId, req);
  }

  @Post()
  @HttpCode(200)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  setAdoptionProcess(@Body() dto: AdoptionDto) {
    return this.adoptionService.setAdoptionProcess(dto);
  }
}

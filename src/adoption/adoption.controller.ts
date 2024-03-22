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
import { AuthGuard } from '@nestjs/passport';
import { UpdateAdoptionDto } from './dto/update.adoption.dto';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

@Controller('adoption')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Get()
  @Permissions(Perm.GET_ADOPTIONS)
  getAllAdoptionProcesses() {
    return this.adoptionService.getAllAdoptionProcesses();
  }

  @Get('pet/:petId')
  @Permissions(Perm.START_ADOPTION)
  startAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }

  @Delete('pet/:petId')
  @Permissions(Perm.START_ADOPTION, Perm.SET_ADOPTION)
  cancelAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.cancelAdoptionProcess(petId, req);
  }

  @Post()
  @HttpCode(200)
  @Permissions(Perm.SET_ADOPTION)
  setAdoptionProcess(@Body() dto: UpdateAdoptionDto) {
    return this.adoptionService.setAdoptionProcess(dto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
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
import { SearchAdoptionDto } from './dto/search.adoption.dto';

@Controller('adoption')
@UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  /* For users. Get, start and cancel adoption process */
  @Get('my')
  @Permissions(Perm.START_ADOPTION)
  getMyAdoptionProcesses(@Req() req: Request) {
    return this.adoptionService.getMyAdoptionProcesses(req);
  }
  @Post('pet/:petId')
  @HttpCode(200)
  @Permissions(Perm.START_ADOPTION)
  startAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }
  @Delete('pet/:petId')
  @Permissions(Perm.START_ADOPTION)
  cancelAdoptionProcess(@Param('petId') petId: string, @Req() req: Request) {
    return this.adoptionService.cancelAdoptionProcess(petId, req);
  }

  /* For vets. Get, update and delete adoption processes. */
  @Get()
  @Permissions(Perm.GET_ADOPTION)
  getAllAdoptionProcesses(@Query() search: SearchAdoptionDto) {
    return this.adoptionService.getAllAdoptionProcess(search);
  }
  @Get(':adoptionId')
  @Permissions(Perm.GET_ADOPTION)
  getAdoptionProcesses(@Param('adoptionId') adoptionId: string) {
    return this.adoptionService.getAdoptionProcess(adoptionId);
  }
  @Post()
  @HttpCode(200)
  @Permissions(Perm.SET_ADOPTION)
  createAdoptionProcess(@Body() dto: UpdateAdoptionDto) {
    return this.adoptionService.setAdoption(dto);
  }
  @Put()
  @HttpCode(200)
  @Permissions(Perm.SET_ADOPTION)
  setAdoptionProcess(@Body() dto: UpdateAdoptionDto) {
    return this.adoptionService.setAdoption(dto);
  }
  @Delete(':adoptionId')
  @Permissions(Perm.SET_ADOPTION)
  deleteAdoptionProcess(@Param('adoptionId') adoptionId: string) {
    return this.adoptionService.deleteAdoptionProcess(adoptionId);
  }
}

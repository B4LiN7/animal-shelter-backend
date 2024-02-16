import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { Request } from 'express';
import { Role } from 'src/auth/decorator/role.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { AdoptionDto } from './dto/adoption.dto';

@Controller('adoption')
@UseGuards(RoleGuard)
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Get('adopt/:petId')
  @Role('user')
  startAdoptionProcess(@Param('petId') petId: number, @Req() req: Request) {
    return this.adoptionService.startAdoptionProcess(petId, req);
  }

  @Post('adopt')
  @Role('shelter_worker', 'admin')
  finishAdoptionProcess(@Body() dto: AdoptionDto) {
    return this.adoptionService.finishAdoptionProcess(dto);
  }

  @Delete('adopt/:petId')
  @Role()
  cancelAdoptionProcess(@Param('petId') petId: number, @Req() req: Request) {
    return this.adoptionService.cancelAdoptionProcess(petId, req);
  }
}

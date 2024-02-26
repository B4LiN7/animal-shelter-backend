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
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { Request } from 'express';
import { UserGuard } from 'src/auth/guard/user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  async getMyUser(@Req() req: Request) {
    return this.userService.getMyUser(req);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @Role(RoleEnum.ADMIN)
  async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  async updatePet(
    @Param('id') id: string,
    @Body() dto: UserDto,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(id, dto, req);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  async deletePet(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

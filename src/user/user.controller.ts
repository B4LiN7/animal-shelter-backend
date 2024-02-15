import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Request } from 'express';
import { UserGuard } from '../auth/guard/user.guard';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
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

  @Put(':id')
  @UseGuards(UserGuard)
  async updatePet(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  async deletePet(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

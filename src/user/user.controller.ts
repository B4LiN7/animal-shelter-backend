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
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Request } from 'express';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Req() req: Request) {
    return this.userService.getUser(id, req);
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}

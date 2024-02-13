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
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Roles('admin')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Req() req: Request) {
    const token = req.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    if (decodedToken.id !== id) {
      throw new ForbiddenException('Invalid token. Please log in.');
    }
    return this.userService.getUser(id);
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

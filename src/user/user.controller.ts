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
import { UpdateUserDto } from './dto/update.user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { Role as R } from '@prisma/client';
import { Request } from 'express';
import { UserGuard } from 'src/auth/guard/user.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* For logged-in users */
  @Get('me')
  async getMyUser(@Req() req: Request) {
    return this.userService.getMyUser(req);
  }
  @Put('me')
  async updateMyUser(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.userService.updateMyUser(req, dto);
  }

  /* For admins */
  @Post()
  @UseGuards(RoleGuard)
  @Role(R.ADMIN)
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
  @Get()
  @UseGuards(RoleGuard)
  @Role(R.ADMIN)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /* For the owners of account and admin */
  @Get(':id')
  @UseGuards(UserGuard)
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @Put(':id')
  @UseGuards(UserGuard)
  async updatePet(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(id, dto, req);
  }
  @Delete(':id')
  @UseGuards(UserGuard)
  async deletePet(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  /* For adoption: To get know what is the user's name */
  @Get('name/:id')
  @UseGuards(RoleGuard)
  @Role(R.ADMIN, R.SHELTER_WORKER)
  async getUserName(@Param('id') id: string) {
    return this.userService.getUserName(id);
  }
}

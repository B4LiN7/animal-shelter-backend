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
import { CreateUserDto } from './dto/create.user.dto';
import { Request } from 'express';
import { UserGuard } from 'src/auth/guard/user.guard';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';

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
  @UseGuards(PermissionGuard)
  @Permissions(Perm.CREATE_USER)
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
  @Get()
  @UseGuards(PermissionGuard)
  @Permissions(Perm.GET_USERS)
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
  @UseGuards(PermissionGuard)
  @Permissions(Perm.GET_USERNAMES)
  async getUserName(@Param('id') id: string) {
    return this.userService.getUserName(id);
  }
}

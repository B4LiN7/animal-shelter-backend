import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.login(dto, req, res);
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.register(dto, req, res);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  @HttpCode(200)
  async logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}

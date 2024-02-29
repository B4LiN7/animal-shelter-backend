import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    return this.authService.register(dto, res);
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}

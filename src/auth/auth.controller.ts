import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getIndex(@Res() res: Response) {
    res.sendFile('index.html', { root: 'public' });
  }
}

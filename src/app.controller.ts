import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message:
        'If you see this message, the server is running correctly (I hope).',
    };
  }

  @Get('manual')
  getManual(@Res() res: Response) {
    res.sendFile('index.html', { root: 'public' });
  }
}

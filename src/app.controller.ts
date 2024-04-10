import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message:
        'If you see this message, the server is running correctly (I hope).',
    };
  }
}

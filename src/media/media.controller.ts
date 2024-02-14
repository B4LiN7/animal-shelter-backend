import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('*')
  serveMedia(@Param('0') path: string, @Res() res) {
    return this.mediaService.serveMedia(path, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.mediaService.uploadFile(file, res);
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Response } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('*')
  serveMedia(@Param('0') path: string, @Res() res: Response) {
    return this.mediaService.serveMedia(path, res);
  }

  @Post()
  @UseGuards(RoleGuard)
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    return this.mediaService.uploadFiles(files, res);
  }
}

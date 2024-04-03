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
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { PermissionEnum as Perm } from '@prisma/client';
import { Permissions } from 'src/auth/decorator/permisson.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @SkipThrottle()
  @Get('*')
  serveMedia(@Param('0') path: string, @Res() res: Response) {
    return this.mediaService.serveMedia(path, res);
  }

  @Post()
  @UseGuards(AuthGuard('jwt-access-token'), PermissionGuard)
  @Permissions(Perm.UPLOAD_IMAGE)
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    return this.mediaService.uploadFiles(files, res);
  }
}

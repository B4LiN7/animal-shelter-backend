import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class MediaService {
  constructor(private logger: Logger) {}

  serveMedia(path: string, res: Response) {
    res.sendFile(path, { root: './public' });
    this.logger.log(`Media served from: ${path}`);
  }

  uploadFile(file: Express.Multer.File, res: Response) {
    if (!file) {
      res.status(400).json({
        message: 'No file uploaded',
      });
      return;
    }

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      res.status(400).json({
        message:
          'Only image files are allowed! You can upload jpg, jpeg, png, or gif files.',
      });
      return;
    }

    const randomName = Date.now().toString(36);
    const regex = /[^A-Za-z0-9.]/g;
    const newFileName =
      randomName + '_' + file.originalname.replace(regex, '0');

    const filePath = path.resolve('public', 'uploads', newFileName);

    writeFile(filePath, file.buffer)
      .catch((err) => {
        res.status(500).json({
          message: 'Error uploading file',
          error: err,
        });
        this.logger.error(`Error uploading file: ${err}`);
      })
      .then(() => {
        res.status(200).json({
          message: 'File uploaded successfully',
          url: '/media/uploads/' + newFileName,
          name: newFileName,
          size: file.size + ' bytes',
        });
        this.logger.log(`File '${newFileName}' uploaded to '/public/uploads/${newFileName}' at ${new Date().toISOString()}`);
      });
  }
}

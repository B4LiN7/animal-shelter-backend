import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import { ResponseStatusDto } from './dto/resStatus.dto';

@Injectable()
export class MediaService {
  constructor(private logger: Logger) {}

  serveMedia(path: string, res: Response) {
    res.sendFile(path, { root: './public' });
    this.logger.log(`Media served from: ${path}`);
  }

  async uploadFiles(files: Express.Multer.File[], res: Response) {
    if (!files) {
      res.status(400).json({
        message: 'No file(s) uploaded',
      });
      return;
    } else if (files.length === 1) {
      return this.uploadSingleFile(files[0], res);
    }

    const answerBody = [];

    for (const file of files) {
      const uploadFile = await this.uploadFile(file);
      answerBody.push(uploadFile);
    }

    if (answerBody.length > 0) {
      res.status(200).json(answerBody);
    } else {
      res.status(400).json(answerBody);
    }
  }

  async uploadSingleFile(file: Express.Multer.File, res: Response) {
    const uploadFile = await this.uploadFile(file);
    if (uploadFile.status === 'success') {
      res.status(200).json(uploadFile);
    } else {
      res.status(400).json(uploadFile);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<ResponseStatusDto> {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return {
        status: 'failed',
        file: file.originalname,
        size: file.size + ' bytes',
        message:
          'Only image files are allowed! You can upload jpg, jpeg, png, or gif files.',
      };
    }

    const randomName = Date.now().toString(36);
    const regex = /[^A-Za-z0-9.]/g;
    const newFileName =
      randomName + '_' + file.originalname.replace(regex, '0');
    const filePath = path.resolve('public', 'uploads', newFileName);

    try {
      await writeFile(filePath, file.buffer);

      this.logger.log(
        `File '${file.originalname}' uploaded to '/public/uploads/${newFileName}' at ${new Date().toISOString()}`,
      );

      return {
        status: 'success',
        file: file.originalname,
        size: file.size + ' bytes',
        url: '/media/uploads/' + newFileName,
        newFile: newFileName,
      };
    } catch (err) {
      this.logger.error(
        `Error uploading file '${file.originalname}' at ${new Date().toISOString()} with error ${err}`,
      );

      return {
        status: 'failed',
        file: file.originalname,
        size: file.size + ' bytes',
        message: `Error uploading file: ${err}`,
      };
    }
  }
}

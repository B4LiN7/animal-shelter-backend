import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { MediaUploadResType } from './type/response.type';
import { existsSync, readdir } from 'fs';
import { unlink } from 'fs/promises';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {
    this.logger = new Logger(MediaService.name);
  }

  /**
   * Serve media files
   * @param reqPath - path of the file
   * @param res - Response object
   * @returns - the file
   */
  serveMedia(reqPath: string, res: Response) {
    const filePath = path.join('./public', reqPath);
    if (!existsSync(filePath)) {
      this.logger.error(`File does not exist: ${filePath}`);
      res.status(404).json({
        message: 'File not found',
      });
      return;
    }
    res.sendFile(reqPath, { root: './public' });
  }

  /**
   * Upload files
   * @param files - array of files
   * @param res - Response object
   */
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

  /**
   * Upload single file
   * @param file - file to upload
   * @param res - Response object
   * @returns - status of the upload
   */
  async uploadSingleFile(file: Express.Multer.File, res: Response) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return {
        status: 'failed',
        file: file.originalname,
        size: file.size + ' bytes',
        message:
          'Only image files are allowed! You can upload jpg, jpeg, png, or gif files.',
      };
    }
    const uploadFile = await this.uploadFile(file);
    if (uploadFile.status === 'success') {
      res.status(200).json(uploadFile);
    } else {
      res.status(400).json(uploadFile);
    }
  }

  /**
   * Upload file
   * @param file - file to upload
   * @returns - status of the upload
   */
  async uploadFile(file: Express.Multer.File): Promise<MediaUploadResType> {
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
    const regex = /[^A-Za-z0-9_.]/g;
    const newFileName =
      randomName + '_' + file.originalname.replace(regex, '0');
    const filePath = path.resolve('public', 'uploads', newFileName);

    try {
      const directory = path.dirname(filePath);
      try {
        await mkdir(directory, { recursive: true });
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }

      await writeFile(filePath, file.buffer);

      this.logger.log(
        `File '${file.originalname}' uploaded to '/public/uploads/${newFileName}'`,
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
        `Error uploading file '${file.originalname}' with the following error ${err}`,
      );

      return {
        status: 'failed',
        file: file.originalname,
        size: file.size + ' bytes',
        message: `Error uploading file: ${err}`,
      };
    }
  }

  @Cron('0 0 * * *')
  /**
   * Clear unused files every day at midnight
   */
  async clearUnusedFiles() {
    const directory = path.resolve('public', 'uploads');
    const fileLinks = await this.getFileLinksInDB(true);
    const filesInDirectory = await this.getFilesInDirectory(directory);

    const notUsedFiles = filesInDirectory.filter(
      (file) => !fileLinks.includes(file),
    );

    this.logger.log(`Removing ${notUsedFiles.length} unused file(s)...`);
    for (const file of notUsedFiles) {
      const filePath = path.join(directory, file);
      await this.removeFile(filePath);
    }
  }

  /**
   * Remove file
   * @param filePath - path of the file to remove
   */
  async removeFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
      this.logger.log(`File removed: ${filePath}`);
    } catch (err) {
      this.logger.error(`Error removing file: ${filePath}, Error: ${err}`);
    }
  }

  /**
   * Get files in directory
   * @param directory - directory to get files from
   */
  async getFilesInDirectory(directory: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      readdir(directory, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }

  /**
   * Get file links in the database
   * @param formatToUploadsFolderContext - format the links to the uploads folder context (default: false) - if true, the links will be formatted to the uploads folder context (just file names)
   */
  async getFileLinksInDB(
    formatToUploadsFolderContext: boolean = false,
  ): Promise<string[]> {
    const linksInDB: string[] = [];

    const petImages = await this.prisma.pet.findMany({
      select: {
        imageUrls: true,
      },
    });
    for (const pet of petImages) {
      if (pet.imageUrls) linksInDB.push(...pet.imageUrls);
    }

    const userImages = await this.prisma.user.findMany({
      select: {
        profileImageUrl: true,
      },
    });
    for (const user of userImages) {
      if (user.profileImageUrl) linksInDB.push(user.profileImageUrl);
    }

    if (formatToUploadsFolderContext) {
      return linksInDB.map((link) => link.replace('/media/uploads/', ''));
    }

    return linksInDB;
  }
}

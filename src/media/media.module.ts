import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}

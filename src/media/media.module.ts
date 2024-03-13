import { Logger, Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MulterModule, PrismaModule, AuthModule, UserModule],
  controllers: [MediaController],
  providers: [Logger, MediaService],
})
export class MediaModule {}

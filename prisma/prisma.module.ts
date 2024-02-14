import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaEnumService } from './enum.service';

@Module({
  providers: [PrismaService, PrismaEnumService],
  exports: [PrismaService, PrismaEnumService],
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaHelperService } from './prismaHelper.service';

@Module({
  providers: [PrismaService, PrismaHelperService],
  exports: [PrismaService, PrismaHelperService],
})
export class PrismaModule {}

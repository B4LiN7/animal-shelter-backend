import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}

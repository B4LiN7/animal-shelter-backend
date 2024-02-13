import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}

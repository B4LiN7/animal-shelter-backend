import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [PrismaModule, UtilityModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}

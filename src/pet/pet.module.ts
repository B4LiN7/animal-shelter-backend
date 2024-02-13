import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [PrismaModule, JwtModule, UtilityModule],
  controllers: [PetController, BreedController],
  providers: [PetService, BreedService],
})
export class PetModule {}

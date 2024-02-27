import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PetModule } from 'src/pet/pet.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, PetModule, UserModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}

import { Logger, Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PetHelperService } from './petHelper.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [PetController],
  providers: [PetService, PetHelperService, Logger],
  exports: [PetHelperService],
})
export class PetModule {}

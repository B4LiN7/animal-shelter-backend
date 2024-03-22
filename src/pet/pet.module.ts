import { Logger, Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { PetHelperService } from './pet.helper.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [PetController],
  providers: [Logger, PetService, PetHelperService],
  exports: [PetHelperService],
})
export class PetModule {}

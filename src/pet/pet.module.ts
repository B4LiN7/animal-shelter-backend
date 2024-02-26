import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PetHelperService } from './petHelper.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, JwtModule, AuthModule, UserModule],
  controllers: [PetController],
  providers: [PetService, PetHelperService],
  exports: [PetHelperService],
})
export class PetModule {}

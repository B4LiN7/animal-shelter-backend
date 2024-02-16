import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, JwtModule, AuthModule],
  controllers: [BreedController],
  providers: [BreedService],
})
export class BreedModule {}

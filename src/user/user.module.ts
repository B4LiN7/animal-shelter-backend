import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { UtilityModule } from 'src/utility/utility.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, UtilityModule, JwtModule],
  controllers: [UserController, LocationController],
  providers: [UserService, LocationService],
})
export class UserModule {}

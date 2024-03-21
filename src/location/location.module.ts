import { Logger, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PrismaModule, RoleModule, UserModule],
  controllers: [LocationController],
  providers: [Logger, LocationService],
})
export class LocationModule {}

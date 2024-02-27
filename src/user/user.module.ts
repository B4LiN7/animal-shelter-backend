import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UserHelperService } from './userHelper.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserHelperService, Logger],
  exports: [UserService, UserHelperService],
})
export class UserModule {}

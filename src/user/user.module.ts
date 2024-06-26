import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserHelperService } from './user-helper.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [PrismaModule, RoleModule],
  controllers: [UserController],
  providers: [Logger, UserService, UserHelperService],
  exports: [UserService, UserHelperService],
})
export class UserModule {}

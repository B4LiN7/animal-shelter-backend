import { Logger, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RoleController } from './role.controller';

/**
 * Role module
 * Will not be used fully because of the lack of time
 */

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [Logger, RoleService],
  exports: [RoleService],
})
export class RoleModule {}

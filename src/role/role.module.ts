import { Logger, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Role module
 * Will not be used fully because of the lack of time
 */

@Module({
  imports: [PrismaModule],
  providers: [Logger, RoleService],
  exports: [RoleService],
})
export class RoleModule {}

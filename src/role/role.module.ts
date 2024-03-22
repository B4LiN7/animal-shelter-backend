import { Logger, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [Logger, RoleService],
  exports: [RoleService],
})
export class RoleModule {}

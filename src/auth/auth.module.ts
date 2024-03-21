import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PrismaModule, PassportModule, RoleModule, UserModule],
  controllers: [AuthController],
  providers: [Logger, JwtStrategy, AuthService],
  exports: [JwtStrategy],
})
export class AuthModule {}

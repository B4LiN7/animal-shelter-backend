import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AccessCookieStrategy } from './strategy/access-cookie.strategy';
import { RoleModule } from '../role/role.module';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';

@Module({
  imports: [PrismaModule, PassportModule, RoleModule, UserModule],
  controllers: [AuthController],
  providers: [
    Logger,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessCookieStrategy,
  ],
  exports: [AccessCookieStrategy],
})
export class AuthModule {}

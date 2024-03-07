import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, Logger, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}

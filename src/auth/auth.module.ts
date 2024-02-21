import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthHelperService } from './authHelper.service';

// Nest.js - full authentication course
// https://youtu.be/4JyBeN69wq4?si=5ry-mv3BMvrpcQAM&t=694

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
],
  controllers: [AuthController],
  providers: [AuthService, AuthHelperService],
  exports: [AuthHelperService],
})
export class AuthModule {}

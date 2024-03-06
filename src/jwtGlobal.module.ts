import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'JWT_SECRET',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}

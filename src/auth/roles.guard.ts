import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies.token;
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.prisma.user.findUnique({
      where: { userId: decodedToken.id },
    });

    return roles.includes(user.role);
  }
}
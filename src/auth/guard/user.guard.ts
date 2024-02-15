import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.token;
    if (!token) {
      throw new ForbiddenException('No token provided. Please log in.');
    }
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const requestedId = request.params.id;
    if (decodedToken.id !== requestedId) {
      throw new ForbiddenException('Invalid token.');
    }
    return true;
  }
}

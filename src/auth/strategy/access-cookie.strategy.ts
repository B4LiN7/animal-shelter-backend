import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTokenType } from '../type/access-token.type';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
/**
 * Get access token from cookie and decode it (decodedToken)
 */
export class AccessCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-cookie',
) {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(request: Request, payload: any) {
    const accessToken = request.cookies.access_token;

    let decodedToken: AccessTokenType;
    try {
      decodedToken = await this.jwt.verifyAsync(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return { ...payload, decodedToken };
  }
}

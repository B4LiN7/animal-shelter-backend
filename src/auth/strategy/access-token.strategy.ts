import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenType } from '../type/access-token.type';

@Injectable()
/**
 * Get access token from Authorization header and decode it (decodedToken)
 */
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private prisma: PrismaService, private jwt: JwtService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const accessToken = req.get('Authorization').replace('Bearer ', '').trim();

    let decodedToken: AccessTokenType;
    try {
      decodedToken = await this.jwt.verifyAsync(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return { ...payload, accessToken, decodedToken };
  }
}

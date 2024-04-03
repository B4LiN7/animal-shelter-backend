import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
/**
 * AccessCookieStrategy is a Passport strategy that we'll use to validate the user's token.
 * If user's token is valid and user still exists in the database, then we'll return the user.
 */
export class AccessCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-cookie',
) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

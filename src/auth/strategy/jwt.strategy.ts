import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
/**
 * JwtStrategy is a Passport strategy that we'll use to validate the user's token.
 * If user's token is valid and user still exists in the database, then we'll return the user.
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.cookies.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
    this.logger = new Logger(JwtStrategy.name);
  }

  async validate(payload: any) {
    return this.prisma.user.findUnique({ where: { userId: payload.userId } });
  }
}

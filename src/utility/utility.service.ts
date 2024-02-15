import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class UtilityService {
  constructor(private prisma: PrismaService) {}

  tryParseId(value: string) {
    const id = parseInt(value.toString());
    if (isNaN(id)) {
      throw new BadRequestException(
        `Invalid ID format. Expected a number. Received: ${value}`,
      );
    }
    return id;
  }
}

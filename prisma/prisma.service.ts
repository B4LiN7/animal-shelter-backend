import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private logger: Logger) {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to the database');
    } catch (err) {
      this.logger.error(`Failed to connect to the database: ${err}`);
    }
  }
}

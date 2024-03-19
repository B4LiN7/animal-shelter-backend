import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { errorMappings } from './prisma.exceptions';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(PrismaExceptionFilter.name);
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.code;
    this.logger.error(
      `Prisma exception (${exception.code}) occurred: ${exception.message}`,
    );

    const mapping = errorMappings[error];
    if (mapping) {
      response.status(mapping.status).json({
        message: mapping.message,
        statusCode: mapping.status,
      });
    } else {
      response.status(500).json({
        message: 'Internal Prisma Error',
        statusCode: 500,
      });
    }
  }
}

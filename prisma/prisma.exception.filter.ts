import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { errorMappings } from './prisma.errors';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const logger = new Logger(PrismaExceptionFilter.name);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.code;

    const mapping = errorMappings[error];
    logger.error(`Prisma exception: ${exception}`);

    if (mapping) {
      response.status(mapping.status).json({
        message: mapping.message,
        statusCode: mapping.status,
      });
    } else {
      response.status(500).json({
        message: 'Prisma Error',
        statusCode: 500,
      });
    }
  }
}

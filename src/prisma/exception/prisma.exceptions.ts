import { HttpStatus } from '@nestjs/common';

export const errorMappings: Record<
  string,
  { status: number; message: string }
> = {
  P2000: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Input data is too long',
  },
  P2001: {
    status: HttpStatus.NO_CONTENT,
    message: 'Record does not exist',
  },
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'Reference Data already exists',
  },
  P2006: {
    status: HttpStatus.BAD_REQUEST,
    message: 'The provided value for field is not valid',
  },
  P2025: {
    status: HttpStatus.BAD_REQUEST,
    message:
      'An operation failed because it depends on one or more records that were required but not found.',
  },
};

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
};

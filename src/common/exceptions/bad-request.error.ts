import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class BadRequestError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('bad_request', message, HttpStatus.BAD_REQUEST, metadata, isToAlert);
  }
}

import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ForbiddenError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('forbidden', message, HttpStatus.FORBIDDEN, metadata, isToAlert);
  }
}

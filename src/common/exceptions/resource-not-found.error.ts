import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class NotFoundError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('resource_not_found', message, HttpStatus.NOT_FOUND, metadata, isToAlert);
  }
}

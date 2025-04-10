import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class InternalServerError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('internal_server_error', message, HttpStatus.INTERNAL_SERVER_ERROR, metadata, isToAlert);
  }
}

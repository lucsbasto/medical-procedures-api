// src/commons/exceptions/unauthorized.error.ts

import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class UnauthorizedError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('unauthorized_error', message, HttpStatus.UNAUTHORIZED, metadata, isToAlert);
  }
}

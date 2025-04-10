import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class TooManyRequestException extends AppException {
  constructor(message: string, isToAlert?: boolean, metadata?: unknown) {
    super('too_many_requests', message, HttpStatus.TOO_MANY_REQUESTS, metadata, isToAlert);
  }
}

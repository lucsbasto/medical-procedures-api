import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class DataProcessingError extends AppException {
  constructor(message: string, metadata?: unknown, isToAlert?: boolean) {
    super('data_processing_error', message, HttpStatus.BAD_REQUEST, metadata, isToAlert);
  }
}

import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class InvalidProvider extends AppException {
  constructor(provider: string, metadata?: unknown, isToAlert?: boolean) {
    super(
      'invalid_provider',
      `Unable to process due to invalid provider with id ${provider}`,
      HttpStatus.BAD_REQUEST,
      metadata,
      isToAlert,
    );
  }
}

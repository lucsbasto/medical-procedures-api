import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class CredentialsNotFound extends AppException {
  constructor(provider: string, metadata?: unknown, isToAlert?: boolean) {
    super(
      'resource_not_found',
      `Credentials not found for channel ${provider}`,
      HttpStatus.NOT_FOUND,
      metadata,
      isToAlert,
    );
  }
}

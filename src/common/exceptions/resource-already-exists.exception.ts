import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ResourceAlreadyExists extends AppException {
  constructor(message: string, details?: unknown, isToAlert?: boolean) {
    super('resource_already_exists', message, HttpStatus.CONFLICT, details, isToAlert);
  }
}

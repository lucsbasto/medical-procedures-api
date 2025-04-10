import { HttpStatus } from '@nestjs/common';
import { JSONValue } from '../types/json.type';
import { AppException } from './app.exception';

export class InvalidSchema extends AppException {
  constructor(name: string, errors: string[], value?: JSONValue, message?: string) {
    super('invalid_schema', message || `Provided value is invalid for type ${name}`, HttpStatus.BAD_REQUEST, {
      value,
      validationErrors: errors,
    });
  }
}

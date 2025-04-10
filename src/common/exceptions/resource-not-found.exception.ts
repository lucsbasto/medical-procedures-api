import { HttpStatus } from '@nestjs/common';
import { JSONObject } from '../types/json.type';
import { AppException } from './app.exception';

export class ResourceNotFound extends AppException {
  constructor(message: string, metadata?: JSONObject, isToAlert?: boolean) {
    super('resource_not_found', message, HttpStatus.NOT_FOUND, metadata, isToAlert);
  }
}

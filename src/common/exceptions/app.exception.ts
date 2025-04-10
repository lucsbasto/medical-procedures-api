import { HttpException, HttpStatus } from '@nestjs/common';
import { JSONObject } from '../types/json.type';

export const APP_EXCEPTION_CODE_VALUES = [
  'api_error',
  'resource_not_found',
  'invalid_provider',
  'resource_already_exists',
  'invalid_schema',
  'already_registered',
  'unauthorized_error',
  'bad_request',
  'internal_server_error',
  'forbidden',
  'data_processing_error',
  'too_many_requests',
] as const;
export type AppExceptionCode = (typeof APP_EXCEPTION_CODE_VALUES)[number];

export type AppExceptionResponse = {
  status: HttpStatus;
  error: {
    code: AppExceptionCode;
    message: string;
  };
  metadata?: unknown;
};

export class AppException extends HttpException {
  private readonly code: AppExceptionCode;
  private readonly metadata?: unknown;
  private readonly isToAlert: boolean;

  constructor(
    code: AppExceptionCode,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    metadata?: unknown,
    isToAlert = true,
  ) {
    super(AppException.buildResponse(code, message, status, metadata), status);

    this.code = code;
    this.message = message;
    this.metadata = metadata;
    this.isToAlert = isToAlert;
  }

  public getCode(): AppExceptionCode {
    return this.code;
  }

  public getMetadata(): JSONObject {
    return JSON.parse(JSON.stringify(this.metadata)) as JSONObject;
  }

  get isToAlertCapture(): boolean {
    return this.isToAlert;
  }

  private static buildResponse(
    code: AppExceptionCode,
    message: string,
    status: HttpStatus,
    metadata?: unknown,
  ): AppExceptionResponse {
    return {
      status,
      error: {
        code,
        message,
      },
      metadata,
    };
  }
}

export function isAppException(exception: unknown): exception is AppException {
  return (
    exception !== null &&
    typeof exception === 'object' &&
    'code' in exception &&
    typeof exception.code === 'string' &&
    !!APP_EXCEPTION_CODE_VALUES.find((code) => code === exception.code)
  );
}

import { ApiError } from '@/common/exceptions/api-error.exception';
import { AppException, isAppException } from '@/common/exceptions/app.exception';
import { asError } from '@/common/helpers/catch-unknown.helper';
import { maskRecursive } from '@/common/helpers/mask-recursive';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (isAppException(exception)) {
      this.logErrorDetails(exception, request);
      httpAdapter.reply(ctx.getResponse(), exception.getResponse(), exception.getStatus());
      return;
    }

    let appException: AppException;
    if (exception instanceof HttpException) {
      appException = new AppException('api_error', exception.message, exception.getStatus(), {
        error: {
          name: exception.name,
          message: exception.message,
          stack: exception.stack,
        },
      });
    } else {
      const error = asError(exception);
      appException = new ApiError(`[${error.name}] ${error.message}`, {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });
    }

    this.logErrorDetails(appException, request);
    httpAdapter.reply(ctx.getResponse(), appException.getResponse(), appException.getStatus());
  }

  private logErrorDetails(exception: AppException, request: Request): void {
    this.logger.error(
      `[ExceptionFilter] (${exception.name}) ${exception.message}: ${logResponseException(exception, request)}`,
      exception.stack,
    );
  }
}

export function logRequest(req: Request): string {
  const queryMasked = new URLSearchParams(maskRecursive(req.query) as Record<string, any>).toString();
  const url = `${req.protocol}://${req.headers.host}${req.path}${queryMasked ? `?${queryMasked}` : ''}`;
  return `request: ${req.method} ${url} body: ${JSON.stringify(maskRecursive(req.body))}`;
}

export function logResponseException(exception: AppException, request?: Request): string {
  const response = exception.getResponse();
  const reponseLog =
    typeof response === 'string' ? response : { ...response, metadata: maskRecursive(exception.getMetadata()) };
  return `${request ? logRequest(request) : ''} response: ${JSON.stringify(reponseLog)} status: ${exception.getStatus()}`;
}

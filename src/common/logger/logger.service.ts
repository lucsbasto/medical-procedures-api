import { ILoggerService } from '@/domain/interfaces/common/logger';
import { Injectable, Scope } from '@nestjs/common';
import { Logger } from 'winston';
import { maskRecursive } from '../helpers/mask-recursive';
import { JSONValue } from '../types/json.type';
import { mainLogger } from './logger';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements ILoggerService {
  private _idempotencyKey: string;
  private _contextName = 'Default';
  private readonly logger: Logger;

  constructor() {
    this.logger = mainLogger.child({});
  }
  setContext(context: string): void {
    this._contextName = context;
  }

  set idempotencyKey(idempotencyKey: string) {
    this._idempotencyKey = idempotencyKey;
  }

  get idempotencyKey(): string {
    return this._idempotencyKey;
  }

  set contextName(contextName: string) {
    this._contextName = contextName;
  }

  get contextName(): string {
    return this._contextName;
  }

  error(message: string, stackTrace?: unknown, mask = true): void {
    this.logger.log({
      level: LogLevel.ERROR,
      message: message,
      meta: {
        context: this.contextName,
        stackTrace: mask ? maskRecursive(stackTrace) : stackTrace,
        idempotency: this._idempotencyKey,
      },
    });
  }

  warn(message: string): void {
    this.logger.log({
      level: LogLevel.WARN,
      message: maskRecursive(message),
      meta: {
        context: this.contextName,
        idempotency: this._idempotencyKey,
      },
    });
  }

  info(message: string): void {
    this.logger.log({
      level: LogLevel.INFO,
      message: maskRecursive(message),
      meta: {
        context: this.contextName,
        idempotency: this._idempotencyKey,
      },
    });
  }

  debug(message: string, details?: JSONValue): void {
    this.logger.log({
      level: LogLevel.DEBUG,
      message: message,
      meta: {
        context: this.contextName,
        idempotency: this._idempotencyKey,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
      },
    });
  }

  log(message: string): void {
    this.info(message);
  }
}

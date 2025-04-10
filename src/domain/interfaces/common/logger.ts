import { JSONValue } from '@/common/types/json.type';

export interface ILoggerService {
  idempotencyKey: string;
  contextName: string;
  setContext(context: string): void;
  error(message: string, stackTrace?: unknown, mask?: boolean): void;
  warn(message: string): void;
  info(message: string): void;
  debug(message: string, details?: JSONValue): void;
  log(message: string): void;
}

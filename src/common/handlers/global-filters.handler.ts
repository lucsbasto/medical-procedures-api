import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';
import { AllExceptionsFilter } from '../middlewares/filters/all-exceptions.filter';

export async function setupGlobalFilters(app: INestApplication): Promise<INestApplication> {
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = await app.resolve(LoggerService);

  const allExceptionsFilter = new AllExceptionsFilter(httpAdapterHost, logger);

  app.useGlobalFilters(allExceptionsFilter);

  return app;
}

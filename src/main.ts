import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupGlobalPipes } from './common/handlers/global-pipes.handler';
import { setupSecurity } from './common/handlers/secutiry.handler';
import { setupSwagger } from './common/handlers/swagger.handler';
import { LoggerService } from './common/logger/logger.service';
import { MainModule } from './main.module';

async function bootstrap() {
  const appLogger = new LoggerService();
  const app = await NestFactory.create<NestExpressApplication>(MainModule, { logger: appLogger });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('HTTP_PORT') || 3000;
  const logger = await app.resolve(LoggerService);

  setupGlobalPipes(app);
  app.setGlobalPrefix('api');
  setupSwagger(app);

  setupSecurity(app, configService);

  await app.listen(port ?? 3000).then(() => {
    logger.info(`Http server listening at port: ${port}`);
  });
}
bootstrap();

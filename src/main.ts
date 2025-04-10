import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './common/handlers/swagger.handler';
import { LoggerService } from './common/logger/logger.service';
import { MainModule } from './main.module';

async function bootstrap() {
  const appLogger = new LoggerService();

  const app = await NestFactory.create(MainModule, { logger: appLogger });
  const port = process.env.HTTP_PORT || 3000;

  const logger = await app.resolve(LoggerService);

  app.setGlobalPrefix('api');
  setupSwagger(app);

  await app.listen(port ?? 3000).then(() => {
    logger.info(`Http server listening at port: ${port}`);
  });
}
bootstrap();

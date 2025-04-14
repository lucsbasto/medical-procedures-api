import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export function setupSecurity(app: NestExpressApplication, configService: ConfigService) {
  const corsEnabled = configService.get<boolean>('CORS_ENABLED') === true;
  const corsOrigin = configService.get<string | string[]>('CORS_ORIGIN') || '*';
  const rateLimitMax = configService.get<number>('RATE_LIMIT_MAX') || 100;
  const rateLimitWindowMs = configService.get<number>('RATE_LIMIT_WINDOW_MS') || 60000;

  if (corsEnabled) {
    app.enableCors({
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  }

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: rateLimitWindowMs,
      max: rateLimitMax,
      message: 'Too many requests from this IP, please try again after a minute.',
    }),
  );
}

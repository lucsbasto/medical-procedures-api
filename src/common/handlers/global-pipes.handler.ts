import { INestApplication } from '@nestjs/common';
import { CustomValidationPipe } from '../middlewares/pipes/custom-validation.pipe';

export function setupGlobalPipes(app: INestApplication): INestApplication {
  app.useGlobalPipes(new CustomValidationPipe({ transform: true }));

  return app;
}

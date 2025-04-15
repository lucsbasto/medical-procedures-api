import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';

export function setupSwagger(app: INestApplication): INestApplication {
  const options = new DocumentBuilder()
    .setTitle('Medical Procedures')
    .setDescription('This is the OpenAPI specifications for the Medical Procedures API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {});

  writeFileSync('./medical-procedures-swagger-spec.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('/api/docs', app, document, {
    customSiteTitle: 'Medical Procedures API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  return app;
}

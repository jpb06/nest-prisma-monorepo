import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { registerGlobals } from './register-globals';

export const bootstrap = async (
  appModule: unknown,
  port: string | number,
  serviceTitleInSwagger: string,
  serviceDescriptionInSwagger: string,
  serviceVersion = '1.0',
): Promise<INestApplication> => {
  const app = await NestFactory.create(appModule);

  registerGlobals(app);

  const config = new DocumentBuilder()
    .setTitle(serviceTitleInSwagger)
    .setDescription(serviceDescriptionInSwagger)
    .setVersion(serviceVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(port, '0.0.0.0');

  return app;
};

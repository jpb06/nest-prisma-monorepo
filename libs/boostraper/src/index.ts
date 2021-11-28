import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const bootstrap = async (
  appModule: unknown,
  port: string | number,
  serviceTitleInSwagger: string,
  serviceDescriptionInSwagger: string,
  serviceVersion = '1.0',
): Promise<INestApplication> => {
  const app = await NestFactory.create(appModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

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

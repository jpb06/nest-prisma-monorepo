import { INestApplication, ValidationPipe } from '@nestjs/common';

import { GlobalExceptionFilter } from '@libs/filters';

export const registerGlobals = (app: INestApplication): void => {
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
};

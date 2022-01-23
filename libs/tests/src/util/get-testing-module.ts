import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { HikingDatabaseClient, UsersDatabaseClient } from '@libs/databases';

type NestModule =
  | Type<unknown>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<unknown>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getTestingModule = (modules: NestModule[]) => {
  const hikingDbMock = mockDeep<HikingDatabaseClient>();
  const usersDbMock = mockDeep<UsersDatabaseClient>();

  const initializeTestApplication = async (): Promise<INestApplication> => {
    const module = await Test.createTestingModule({
      imports: modules,
    })
      .overrideProvider(HikingDatabaseClient)
      .useValue(hikingDbMock)
      .overrideProvider(UsersDatabaseClient)
      .useValue(usersDbMock)
      .compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    return app;
  };

  return { initializeTestApplication, hikingDbMock, usersDbMock };
};

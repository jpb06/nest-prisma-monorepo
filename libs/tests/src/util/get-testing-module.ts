import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { registerGlobals } from '@libs/boostraper/register-globals';
import {
  HikingDatabaseClient,
  ProjectsDatabaseClient,
  UsersDatabaseClient,
} from '@libs/databases';

type NestModule =
  | Type<unknown>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<unknown>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getTestingModule = (modules: NestModule[]) => {
  const hikingDbMock = mockDeep<HikingDatabaseClient>();
  const usersDbMock = mockDeep<UsersDatabaseClient>();
  const projectsDbMock = mockDeep<ProjectsDatabaseClient>();

  const initializeTestApplication = async (): Promise<INestApplication> => {
    const module = await Test.createTestingModule({
      imports: modules,
    })
      .overrideProvider(HikingDatabaseClient)
      .useValue(hikingDbMock)
      .overrideProvider(UsersDatabaseClient)
      .useValue(usersDbMock)
      .overrideProvider(ProjectsDatabaseClient)
      .useValue(projectsDbMock)
      .compile();

    const app = module.createNestApplication();
    registerGlobals(app);

    await app.init();

    return app;
  };

  return {
    initializeTestApplication,
    hikingDbMock,
    usersDbMock,
    projectsDbMock,
  };
};

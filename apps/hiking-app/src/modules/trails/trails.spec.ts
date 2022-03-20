import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '@libs/tests';

import { mockedTrails } from './mocks/trails.mock-data';
import { TrailsModule } from './trails.module';

describe('TrailsController (e2e)', () => {
  let app: INestApplication;
  const { initializeTestApplication, hikingDbMock } = getTestingModule([
    TrailsModule,
  ]);

  beforeEach(async () => {
    app = await initializeTestApplication();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /trails', () => {
    it('should return trails', async () => {
      hikingDbMock.trail.findMany.mockResolvedValueOnce(mockedTrails);

      const { body } = await request(app.getHttpServer())
        .get('/trails')
        .send()
        .expect(200);

      expect(body).toStrictEqual(mockedTrails);
    });

    it('should only return trail data', async () => {
      const extendedData = mockedTrails.map((t) => ({
        ...t,
        additonalProp: true,
      }));
      hikingDbMock.trail.findMany.mockResolvedValueOnce(extendedData);

      const { body } = await request(app.getHttpServer())
        .get('/trails')
        .send()
        .expect(200);

      expect(body).toStrictEqual(mockedTrails);
    });
  });
});

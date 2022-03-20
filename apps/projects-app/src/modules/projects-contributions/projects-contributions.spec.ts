import { INestApplication } from '@nestjs/common';
import { Contribution } from '@prisma/db-projects';
import request from 'supertest';

import { mockedUsers } from '@apps/hiking-app/modules/trails-sessions/mocks/users.mock-data';
import { asDateString, getTestingModule } from '@libs/tests';
import { mockApiResponse } from '@libs/tests/mocks/api-response.mock';

import { mockedProjectsContributions } from './mocks/projects-contributions.mock-data';
import { ProjectsContributionsModule } from './projects-contributions.module';

describe('ProjectsContributionsController (e2e)', () => {
  let app: INestApplication;
  const { initializeTestApplication, usersDbMock, projectsDbMock } =
    getTestingModule([ProjectsContributionsModule]);

  beforeEach(async () => {
    app = await initializeTestApplication();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /projects/:id/contributions', () => {
    it('should return a bad request error when param is not an integer', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/projects/yolo/contributions')
        .send()
        .expect(400);

      expect(body).toStrictEqual(
        mockApiResponse(
          400,
          'Bad Request',
          'Expecting an integer as param for trail session id',
        ),
      );
    });

    it('should return', async () => {
      projectsDbMock.contribution.findMany.mockResolvedValueOnce(
        mockedProjectsContributions as unknown as Contribution[],
      );
      usersDbMock.user.findMany.mockResolvedValue(mockedUsers);

      const { body } = await request(app.getHttpServer())
        .get(`/projects/${mockedProjectsContributions[0].id}/contributions`)
        .send()
        .expect(200);

      expect(body).toStrictEqual(
        mockedProjectsContributions.map((c) => {
          const user = mockedUsers.find((u) => u.id === c.idDev);
          return {
            id: c.id,
            date: asDateString(c.date),
            dev: {
              id: c.idDev,
              name: user?.name,
              position: user?.position,
            },
            repo: {
              id: c.Repo.id,
              name: c.Repo.name,
              repoUrl: c.Repo.repoUrl,
            },
          };
        }),
      );
    });
  });
});

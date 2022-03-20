import { INestApplication } from '@nestjs/common';
import { Session } from '@prisma/db-hiking';
import { User } from '@prisma/db-users';
import request from 'supertest';

import { getTestingModule, asDateString } from '@libs/tests';
import { mockApiResponse } from '@libs/tests/mocks/api-response.mock';

import { mockedsessions } from './mocks/sessions.mock-data';
import { mockedUsers } from './mocks/users.mock-data';
import { TrailsSessionsModule } from './trail-sessions.module';

describe('TrailsSessionsController (e2e)', () => {
  let app: INestApplication;
  const { initializeTestApplication, hikingDbMock, usersDbMock } =
    getTestingModule([TrailsSessionsModule]);

  beforeEach(async () => {
    app = await initializeTestApplication();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /trails/sessions', () => {
    it('should return trails sessions', async () => {
      hikingDbMock.session.findMany.mockResolvedValueOnce(
        mockedsessions as never,
      );
      usersDbMock.user.findMany.mockResolvedValue(mockedUsers);

      const { body } = await request(app.getHttpServer())
        .get('/trails/sessions')
        .send()
        .expect(200);

      expect(body).toStrictEqual(
        mockedsessions.map((s) => ({
          id: s.id,
          date: asDateString(s.date),
          trail: s.Trail,
          hikers: mockedUsers.filter((u) =>
            s.Participants.some((s) => s.idDev === u.id),
          ),
        })),
      );
    });
  });

  describe('POST /trails/sessions/:id/join', () => {
    it('should return a bad request error when param is not an integer', async () => {
      const idUser = mockedUsers[0].id;

      const { body } = await request(app.getHttpServer())
        .post('/trails/sessions/cool/join')
        .send({ idDev: idUser })
        .expect(400);

      expect(body).toStrictEqual(
        mockApiResponse(
          400,
          'Bad Request',
          'Expecting an integer as param for trail session id',
        ),
      );
    });

    it('should return a bad request error when no dev id has been sent in body', async () => {
      const idTrailSession = mockedsessions[0].id;

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/${idTrailSession}/join`)
        .send()
        .expect(400);

      expect(body).toStrictEqual(
        mockApiResponse(400, 'Bad Request', [
          'idDev must be an integer number',
        ]),
      );
    });

    it('should return a not found error if trail session does not exist', async () => {
      hikingDbMock.session.findFirst.mockResolvedValueOnce(null);

      const idUser = mockedUsers[0].id;

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/1000/join`)
        .send({ idDev: idUser })
        .expect(404);

      expect(body).toStrictEqual(
        mockApiResponse(404, 'Not Found', 'Session not found'),
      );
    });

    it('should return a not found error if user does not exist', async () => {
      hikingDbMock.session.findFirst.mockResolvedValueOnce(
        mockedsessions[0] as unknown as Session,
      );

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/${mockedsessions[0].id}/join`)
        .send({ idDev: 1000 })
        .expect(404);

      expect(body).toStrictEqual(
        mockApiResponse(404, 'Not Found', 'User not found'),
      );
    });

    it('should return a conflict error if user is already in session', async () => {
      hikingDbMock.session.findFirst.mockResolvedValueOnce(
        mockedsessions[0] as unknown as Session,
      );
      usersDbMock.user.findMany.mockResolvedValue(
        mockedUsers as unknown as User[],
      );

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/${mockedsessions[0].id}/join`)
        .send({ idDev: mockedUsers[0].id })
        .expect(409);

      expect(body).toStrictEqual(
        mockApiResponse(409, 'Conflict', 'User already in session'),
      );
    });

    it('should return an internal server error when user could not be added to the trail session', async () => {
      const session = mockedsessions[0];
      const user = mockedUsers[2];
      hikingDbMock.session.findFirst.mockResolvedValueOnce(
        session as unknown as Session,
      );
      usersDbMock.user.findMany.mockResolvedValue(
        mockedUsers as unknown as User[],
      );
      hikingDbMock.sessionParticipant.create.mockRejectedValueOnce({});

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/${mockedsessions[0].id}/join`)
        .send({ idDev: mockedUsers[2].id })
        .expect(500);

      expect(body).toStrictEqual(
        mockApiResponse(
          500,
          'Internal Server Error',
          `An error occured while adding user ${user.id} to trail session ${session.id}`,
        ),
      );
    });

    it('should return the trail session', async () => {
      const session = mockedsessions[0];
      const user = mockedUsers[2];
      hikingDbMock.session.findFirst.mockResolvedValueOnce(
        session as unknown as Session,
      );
      usersDbMock.user.findMany.mockResolvedValue(
        mockedUsers as unknown as User[],
      );
      hikingDbMock.sessionParticipant.create.mockResolvedValueOnce({
        id: 1,
        idDev: user.id,
        idSession: session.id,
      });

      const { body } = await request(app.getHttpServer())
        .post(`/trails/sessions/${mockedsessions[0].id}/join`)
        .send({ idDev: mockedUsers[2].id })
        .expect(201);

      expect(body).toStrictEqual({
        id: session.id,
        date: asDateString(session.date),
        trail: session.Trail,
        hikers: [
          ...mockedUsers.filter((u) =>
            session.Participants.find((p) => p.idDev === u.id),
          ),
          user,
        ],
      });
    });
  });
});

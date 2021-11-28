import { Injectable } from '@nestjs/common';
import { Trail, Session } from '@prisma/db-hiking';
import { User } from '@prisma/db-users';
import { distinct, filter, map, mergeMap, Observable, of, toArray } from 'rxjs';

import { UsersRepositoryService } from '../../databases/repositories/users-repository.service';
import { SessionSelectType } from '../../databases/selects/sessions.select';

@Injectable()
export class UsersService extends UsersRepositoryService {
  getDistinctUsersin = (
    sessions: SessionSelectType[],
  ): Observable<Array<User>> =>
    of(sessions.map((e) => e.Participants.map((p) => p.idDev)).flat()).pipe(
      distinct(),
      mergeMap(this.getBy),
    );

  applyUsersTo = (
    session: SessionSelectType,
    users$: Observable<User[]>,
  ): Observable<
    Partial<Session> & { trail: Trail | null; hikers: Array<User> }
  > =>
    users$.pipe(
      mergeMap((l) => l),
      filter((u) => session.Participants.some((p) => p.idDev === u.id)),
      toArray(),
      map((users) => ({
        id: session.id,
        date: session.date,
        trail: session.Trail,
        hikers: users,
      })),
    );
}

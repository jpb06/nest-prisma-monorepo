import { Injectable } from '@nestjs/common';
import { User } from '@prisma/db-users';
import { plainToInstance } from 'class-transformer';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

import {
  conflictError,
  internalServerError,
  notFoundError,
} from '@libs/rxjs/exceptions';

import { HikingRepositoryService } from '../../databases/repositories/hiking-repository.service';
import { SessionSelectType } from '../../databases/selects/sessions.select';
import { TrailSessionResponseDto } from '../dto/trail-session.response.dto';
import { UsersService } from './users.service';

@Injectable()
export class JoinTrailSessionService {
  constructor(
    private readonly hiking: HikingRepositoryService,
    private readonly users: UsersService,
  ) {}

  joinSession = (
    id: number,
    idDev: number,
  ): Observable<TrailSessionResponseDto> =>
    this.hiking.getTrailSessionBy(id).pipe(
      mergeMap((session) => this.throwNotFoundIfNo(session)),
      mergeMap((session) => this.throwIfUserDoesNotExist(idDev, session)),
      mergeMap(({ session, users }) =>
        this.throwIfAlreadyInSession(idDev, session).pipe(
          mergeMap((_) => this.addUserToSession(session, idDev)),
          mergeMap((s) => this.users.applyUsersTo(s, of(users))),
          map((o) => plainToInstance(TrailSessionResponseDto, o)),
        ),
      ),
    );

  private readonly throwNotFoundIfNo = (
    session: SessionSelectType | null,
  ): Observable<SessionSelectType> =>
    session === null ? notFoundError('Session not found') : of(session);

  private readonly throwIfUserDoesNotExist = (
    idDev: number,
    session: SessionSelectType,
  ): Observable<{ session: SessionSelectType; users: User[] }> =>
    this.users
      .getAll()
      .pipe(
        mergeMap((users) =>
          users.find((u) => u.id === idDev)
            ? of({ session, users })
            : notFoundError('User not found'),
        ),
      );

  private readonly throwIfAlreadyInSession = (
    idDev: number,
    session: SessionSelectType,
  ): Observable<SessionSelectType> =>
    session.Participants.find((el) => el.idDev === idDev)
      ? conflictError('User already in session')
      : of(session);

  private readonly addUserToSession = (
    session: SessionSelectType,
    idDev: number,
  ): Observable<SessionSelectType> =>
    this.hiking.joinTrailSession(idDev, session.id).pipe(
      catchError((_) =>
        internalServerError(
          `An error occured while adding user ${idDev} to trail session ${session.id}`,
        ),
      ),
      mergeMap((_) =>
        of({
          ...session,
          Participants: [...session.Participants, { idDev }],
        }),
      ),
    );
}

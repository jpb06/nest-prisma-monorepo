import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';

import { UsersService } from './users.service';
import { HikingRepositoryService } from '../../databases/repositories/hiking-repository.service';
import { TrailSessionResponseDto } from '../dto/trail-session.response.dto';

@Injectable()
export class TrailsSessionsService {
  constructor(
    private readonly hiking: HikingRepositoryService,
    private readonly users: UsersService,
  ) {}

  getSessions = (): Observable<Array<TrailSessionResponseDto>> => {
    const sessions$ = this.hiking.getSessions();

    return sessions$.pipe(
      mergeMap((sessions) => {
        const users$ = this.users.getDistinctUsersin(sessions);

        return from(sessions).pipe(
          map((session) => this.users.applyUsersTo(session, users$)),
          mergeMap((l) => l),
          map((o) => plainToInstance(TrailSessionResponseDto, o)),
          toArray(),
        );
      }),
    );
  };
}

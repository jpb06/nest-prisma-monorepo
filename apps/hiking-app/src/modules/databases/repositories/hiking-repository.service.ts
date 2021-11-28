import { Injectable } from '@nestjs/common';
import { Trail, SessionParticipant } from '@prisma/db-hiking';
import { from, Observable } from 'rxjs';

import { HikingDatabaseService } from '@libs/databases';

import { SessionSelectType, sessionsSelect } from '../selects/sessions.select';

@Injectable()
export class HikingRepositoryService extends HikingDatabaseService {
  getSessions = (): Observable<Array<SessionSelectType>> =>
    from(
      this.hikingDB.session.findMany({
        select: sessionsSelect,
      }),
    );

  getTrails = (): Observable<Array<Trail>> =>
    from(this.hikingDB.trail.findMany({}));

  getTrailSessionBy = (id: number): Observable<SessionSelectType | null> =>
    from(
      this.hikingDB.session.findFirst({
        where: {
          id,
        },
        select: sessionsSelect,
      }),
    );

  joinTrailSession = (
    idDev: number,
    idSession: number,
  ): Observable<SessionParticipant> =>
    from(
      this.hikingDB.sessionParticipant.create({
        data: {
          idDev,
          idSession,
        },
      }),
    );
}

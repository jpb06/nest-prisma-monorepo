import { Injectable } from '@nestjs/common';
import { SessionParticipant, Trail } from '@prisma/db-hiking';
import { from, Observable } from 'rxjs';

import { HikingDatabaseService } from '@libs/databases';

import { SessionSelectType, sessionsSelect } from '../selects/sessions.select';

@Injectable()
export class HikingRepositoryService extends HikingDatabaseService {
  getSessions = (): Observable<SessionSelectType[]> =>
    from(
      this.hikingDB.session.findMany({
        select: sessionsSelect,
      }),
    );

  getTrails = (): Observable<Trail[]> => from(this.hikingDB.trail.findMany({}));

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
